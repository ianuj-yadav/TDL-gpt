"""
chat_bot.py — TDL Expert RAG Chatbot (core engine)
=====================================================
This module is the shared engine used by both the CLI (`start_chat`)
and the Streamlit UI (`streamlit_app.py`). Keeping the retrieval logic,
system prompt, and validation code in ONE place means the CLI and the
web UI can never silently drift apart.

WHAT MAKES THIS "REAL" RAG (vs. keyword search dressed up as AI):
 1. Local sentence-transformer embeddings + FAISS cosine similarity
    search over TDL-definition-sized chunks (see buildkb.py).
 2. Query expansion using a TDL/Tally domain synonym table, so a
    question about "GST" also matches chunks about "tax", a question
    about "voucher" also matches "voucher type", etc.
 3. Definition-type-aware boosting: if the user asks about a
    "collection", chunks tagged def_type="Collection" get a relevance
    boost over equally-similar chunks of a different type.
 4. Near-duplicate suppression so the context window isn't wasted on
    three copies of nearly the same chunk.
 5. A real (if lightweight) TDL syntax validator that checks bracket/
    colon balance and the presence of recognized definition types in
    generated code, with one automatic self-repair pass if the first
    answer fails validation — this is what "produces correct code"
    actually requires; an LLM alone will confidently emit malformed
    TDL without a check like this.
"""

import io
import json
import os
import re
import sys
import tempfile
import traceback
import hashlib
import numpy as np
import faiss
from openai import OpenAI
from datetime import datetime
from sentence_transformers import SentenceTransformer

from buildkb import (
    chunk_tdl_source,
    chunk_text,
    chunk_any_content,
    read_file_content,
    read_bytes_content,
    embed_and_index,
    tokenize_for_lexical,
    build_sparse_lexical_index,
    EMBEDDING_MODEL_NAME as _KB_EMBEDDING_MODEL_NAME,
)

# ─────────────────────────────────────────────────────────────────────
# Agent 1: Local Embedding Model for Semantic Vector Search
# ─────────────────────────────────────────────────────────────────────
EMBEDDING_MODEL_NAME = _KB_EMBEDDING_MODEL_NAME
embedder = SentenceTransformer(EMBEDDING_MODEL_NAME)

# ─────────────────────────────────────────────────────────────────────
# Agent 2: LLM Generation via NVIDIA NIM API
# ─────────────────────────────────────────────────────────────────────
MODEL_NAME = os.environ.get("TDL_MODEL_NAME", "z-ai/glm-5.2")
DEFAULT_API_KEY = "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"

_USE_COLOR = sys.stdout.isatty() and os.getenv("NO_COLOR") is None
_REASONING_COLOR = "\033[90m" if _USE_COLOR else ""
_RESET_COLOR = "\033[0m" if _USE_COLOR else ""

_API_KEY_ERROR = (
    "No NVIDIA NIM API key found. Provide one via:\n\n"
    "    export NVIDIA_API_KEY=\"your-key-here\"        (macOS/Linux)\n"
    "    setx NVIDIA_API_KEY \"your-key-here\"           (Windows)\n\n"
    "...or enter it in the Streamlit sidebar at runtime."
)


def clean_api_key(raw_key):
    if not raw_key:
        return ""
    k = str(raw_key).strip()
    if k.lower().startswith("bearer "):
        k = k[7:].strip()
    return k


def get_client(api_key=None):
    """Build the OpenAI-compatible client for the NVIDIA NIM endpoint."""
    key = clean_api_key(api_key) or DEFAULT_API_KEY or clean_api_key(os.environ.get("NVIDIA_API_KEY"))
    if not key:
        raise RuntimeError(_API_KEY_ERROR)
    return OpenAI(base_url="https://integrate.api.nvidia.com/v1", api_key=key)


try:
    client = get_client()
except RuntimeError:
    client = None


# ─────────────────────────────────────────────────────────────────────
# TDL / Tally domain knowledge used to sharpen retrieval
# ─────────────────────────────────────────────────────────────────────

# Query expansion table: broadens the embedding query so semantically
# related TDL/Tally terminology is retrieved even if the user's exact
# wording doesn't appear in the source files.
TDL_SYNONYMS = {
    "gst": ["tax", "goods and services tax", "duty"],
    "tax": ["gst", "duty", "levy"],
    "voucher": ["voucher type", "voucher entry", "transaction"],
    "ledger": ["account", "party ledger"],
    "party": ["ledger", "customer", "supplier"],
    "udf": ["user defined function", "function"],
    "menu": ["gateway of tally", "master menu", "key item"],
    "button": ["key", "key item"],
    "report": ["display", "print report"],
    "collection": ["data source", "sql collection", "compute"],
    "field": ["display field", "line field"],
    "alter": ["modify", "override", "#"],
    "sales": ["invoice", "voucher type sales"],
    "stock item": ["inventory item", "item master"],
}

# Maps user-facing keywords to the def_type tags produced by buildkb.py,
# used to boost chunks whose TDL definition type matches the question.
DEF_TYPE_HINTS = {
    "report": "Report", "form": "Form", "part": "Part", "line": "Line",
    "field": "Field", "collection": "Collection", "function": "Function",
    "udf": "Function", "menu": "Menu", "button": "Key", "key": "Key",
    "variable": "Variable", "system": "System", "object": "Object",
    "attribute": "Attribute", "table": "Table",
}

# Recognized top-level definition keywords, reused for output validation.
TDL_DEFINITION_TYPES = (
    "Report", "Form", "Part", "Line", "Field", "Collection", "Function",
    "Menu", "System", "Variable", "Key", "Button", "Object", "Attribute", "Table",
)
DEFINITION_HEADER_RE = re.compile(
    r"\[\s*#?\s*(" + "|".join(TDL_DEFINITION_TYPES) + r")\s*:\s*[^\]]+\]",
    re.IGNORECASE,
)


def expand_query(user_query):
    """Append domain synonyms to the query text before embedding, purely
    to widen semantic recall. The original query is what's shown/used
    for keyword scoring; this expanded version is only used to build
    the embedding vector.
    """
    terms = [w.lower().strip(".,?!") for w in user_query.split()]
    extra = []
    for t in terms:
        if t in TDL_SYNONYMS:
            extra.extend(TDL_SYNONYMS[t])
    if not extra:
        return user_query
    return user_query + " " + " ".join(extra)


def detect_requested_def_types(user_query):
    """Return the set of TDL definition types (Report/Form/Collection/...)
    that the user's question appears to be asking about, for boosting.
    """
    q = user_query.lower()
    return {def_type for kw, def_type in DEF_TYPE_HINTS.items() if kw in q}


def _tokenize(text):
    return set(re.findall(r"[a-z0-9]+", text.lower()))


def load_knowledge_base(filepath="tdl_knowledge_base.json"):
    """Load a flat filename->content map. Supports both a hand-authored
    tdl_knowledge_base.json and the kb_metadata.json produced by buildkb.py.
    Mainly used for the Streamlit sidebar's file/size stats.
    """
    try:
        if os.path.exists(filepath):
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
                kb = {}
                for k, v in data.items():
                    kb[k] = v.get("content", "") if isinstance(v, dict) else str(v)
                return kb
        elif os.path.exists("kb_metadata.json"):
            with open("kb_metadata.json", "r", encoding="utf-8") as f:
                data = json.load(f)
                kb = {}
                metadata = data.get("metadata", [])
                chunks = data.get("chunks", [])
                for idx, meta in enumerate(metadata):
                    fname = meta.get("file", f"chunk_{idx}")
                    chunk_text = chunks[idx] if idx < len(chunks) else ""
                    kb[fname] = kb.get(fname, "") + ("\n" if fname in kb else "") + chunk_text
                return kb
        return {}
    except Exception as e:
        print(f"[ERROR] Could not load knowledge base: {e}")
        return {}


class MultiLevelAgentMemory:
    """Hybrid RAG memory system combining:
    - Dynamic user-override memory (highest priority — corrections you teach it)
    - FAISS cosine-similarity semantic vector search (deep retrieval)
    - TDL definition-type boosting + keyword scoring (precision matching)
    - Near-duplicate suppression (keeps the context window information-dense)
    """

    def __init__(self, index_file="kb_index.faiss", meta_file="kb_metadata.json"):
        print("[System] Booting Multi-Level Vector Memory...")
        self.dynamic_kb = self._load_json("dynamic_memory.json")
        self.metadata = []
        self.chunks = []
        self.sparse_index = {}
        self.index = None
        self.similarity_metric = "cosine"

        if os.path.exists(index_file) and os.path.exists(meta_file):
            self.index = faiss.read_index(index_file)
            meta_data_file = self._load_json(meta_file)
            self.metadata = meta_data_file.get("metadata", [])
            self.chunks = meta_data_file.get("chunks", [])
            self.sparse_index = meta_data_file.get("sparse_index", {})
            if not self.sparse_index and self.chunks:
                self.sparse_index = build_sparse_lexical_index(self.chunks)
            self.similarity_metric = meta_data_file.get("similarity_metric", "l2")
            print(f"[System] Active FAISS DB loaded. Total entries: {self.index.ntotal} "
                  f"(metric: {self.similarity_metric})")
        else:
            print("[WARNING] Vector DB not found. Run buildkb.py first.")

    def _load_json(self, filepath):
        if not os.path.exists(filepath):
            return {}
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {}

    def add_documents(self, files, persist=False, index_file="kb_index.faiss", meta_file="kb_metadata.json"):
        """Ingest files uploaded live in the chatbot UI: extract text,
        chunk (TDL-boundary-aware for .tdl, sliding-window for everything
        else), embed, and merge straight into the active in-memory FAISS
        index so they're queryable on the very next question — no need
        to re-run buildkb.py first.

        `files` accepts either:
          - a list of (filename, raw_bytes) tuples, or
          - Streamlit UploadedFile objects (have .name and .getvalue())

        If persist=True, the new chunks are also written back into
        kb_index.faiss / kb_metadata.json so they survive a restart.

        Returns a summary dict: {"added_files": [...], "added_chunks": N,
        "skipped": [(filename, reason), ...]}.
        """
        new_chunks = []
        new_metadata = []
        seen_chunk_hashes = {
            hashlib.sha256(c.strip().encode("utf-8")).hexdigest() for c in self.chunks
        }
        added_files = []
        skipped = []

        for f in files:
            if hasattr(f, "name") and hasattr(f, "getvalue"):
                filename, raw_bytes = f.name, f.getvalue()
            else:
                filename, raw_bytes = f

            try:
                content = read_bytes_content(raw_bytes, filename)
                if content is None:
                    skipped.append((filename, "binary/unreadable content"))
                    continue
                content = content.strip()
                if not content:
                    skipped.append((filename, "empty after extraction"))
                    continue

                file_chunks = chunk_any_content(content, filename)
                added_for_file = 0
                for i, (chunk, def_type, def_name) in enumerate(file_chunks):
                    chunk_hash = hashlib.sha256(chunk.strip().encode("utf-8")).hexdigest()
                    if chunk_hash in seen_chunk_hashes:
                        continue
                    seen_chunk_hashes.add(chunk_hash)
                    new_chunks.append(chunk)
                    new_metadata.append({
                        "file": f"uploaded:{filename}",
                        "chunk_id": i,
                        "length": len(chunk),
                        "def_type": def_type,
                        "def_name": def_name,
                    })
                    added_for_file += 1

                if added_for_file == 0:
                    skipped.append((filename, "no new (non-duplicate) content found"))
                else:
                    added_files.append(filename)

            except Exception as e:
                skipped.append((filename, str(e)))

        if new_chunks:
            _, merged_index = embed_and_index(new_chunks, embedder, existing_index=self.index)
            self.index = merged_index
            self.chunks.extend(new_chunks)
            self.metadata.extend(new_metadata)
            self.sparse_index = build_sparse_lexical_index(self.chunks)
            self.similarity_metric = "cosine"

            if persist:
                faiss.write_index(self.index, index_file)
                with open(meta_file, "w", encoding="utf-8") as fh:
                    json.dump({
                        "metadata": self.metadata,
                        "chunks": self.chunks,
                        "sparse_index": self.sparse_index,
                        "embedding_model": EMBEDDING_MODEL_NAME,
                        "similarity_metric": "cosine",
                        "built_at": datetime.now().isoformat(),
                    }, fh, indent=2)

        return {
            "added_files": added_files,
            "added_chunks": len(new_chunks),
            "skipped": skipped,
        }

    def save_dynamic_memory(self):
        with open("dynamic_memory.json", "w", encoding="utf-8") as f:
            json.dump(self.dynamic_kb, f, indent=4)

    def learn_from_user(self, user_input, last_bot_response):
        """Detect user corrections and save them as high-priority override rules."""
        correction_words = ["wrong", "fix", "instead", "update", "actually", "correct", "change"]
        if ("[" in user_input and "]" in user_input) or any(w in user_input.lower() for w in correction_words):
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            self.dynamic_kb[f"Rule_{timestamp}"] = {
                "rule": user_input,
                "context": last_bot_response[-200:] if last_bot_response else "Direct override",
            }
            self.save_dynamic_memory()
            return True
        return False

    def retrieve_context(self, user_query, top_k=8, return_sources=False, return_metrics=False):
        """Tier 3 Multi-Stage Hybrid RAG Pipeline:
        1. Dynamic Override Memory (highest priority)
        2. Stage 1 (Dense): FAISS cosine-similarity semantic retrieval
        3. Stage 2 (Sparse): Lexical BM25/TF-IDF token exact matching
        4. Stage 3 (RRF): Reciprocal Rank Fusion combining dense & sparse ranks
        5. TDL definition-type boost & near-duplicate Jaccard suppression
        6. Confidence Guardrail: computes retrieval_confidence & detects general queries
        """
        matched_context = []
        seen_token_sets = []
        source_files = []
        has_override = False

        query_terms = tokenize_for_lexical(user_query)
        requested_types = detect_requested_def_types(user_query)

        # ── Level 1: Dynamic Override Memory (Highest Priority) ──
        for key, data in self.dynamic_kb.items():
            content = data.get("rule", "") if isinstance(data, dict) else str(data)
            if any(term in content.lower() for term in query_terms):
                matched_context.append(f"!!! SYSTEM OVERRIDE ({key}) !!!\n{content}\n")
                source_files.append(f"override:{key}")
                has_override = True

        # ── Stage 1 & Stage 2: Dense Semantic + Sparse Lexical Scoring ──
        candidate_scores = {}  # idx -> {"dense_sim": float, "sparse_score": float, "dense_rank": int, "sparse_rank": int}

        if self.index is not None and self.index.ntotal > 0:
            expanded = expand_query(user_query)
            query_vector = embedder.encode([expanded], convert_to_numpy=True).astype("float32")
            search_k = min(max(top_k * 4, 25), self.index.ntotal)

            if self.similarity_metric == "cosine":
                faiss.normalize_L2(query_vector)
                similarities, indices = self.index.search(query_vector, search_k)
            else:
                distances, indices = self.index.search(query_vector, search_k)
                similarities = 1.0 / (1.0 + distances)

            # Record Dense Ranks
            for rank_i in range(search_k):
                idx = indices[0][rank_i]
                sim = float(similarities[0][rank_i])
                if idx == -1 or idx >= len(self.chunks):
                    continue
                candidate_scores[idx] = {
                    "dense_sim": sim,
                    "sparse_score": 0.0,
                    "dense_rank": rank_i + 1,
                    "sparse_rank": 999,
                }

            # Calculate Sparse Lexical Scores
            sparse_candidates = []
            for idx in range(len(self.chunks)):
                chunk_lower = self.chunks[idx].lower()
                s_score = 0.0
                for term in query_terms:
                    count = chunk_lower.count(term)
                    if count:
                        s_score += min(count * 0.4, 3.0)
                if s_score > 0:
                    sparse_candidates.append((idx, s_score))

            sparse_candidates.sort(key=lambda x: x[1], reverse=True)
            for rank_i, (idx, s_score) in enumerate(sparse_candidates[:search_k]):
                if idx not in candidate_scores:
                    candidate_scores[idx] = {
                        "dense_sim": 0.0,
                        "sparse_score": s_score,
                        "dense_rank": 999,
                        "sparse_rank": rank_i + 1,
                    }
                else:
                    candidate_scores[idx]["sparse_score"] = s_score
                    candidate_scores[idx]["sparse_rank"] = rank_i + 1

        # ── Stage 3: Reciprocal Rank Fusion (RRF) ──
        scored_results = []
        max_rrf_score = 0.0
        for idx, stats in candidate_scores.items():
            meta = self.metadata[idx] if idx < len(self.metadata) else {}
            source_file = meta.get("file", "unknown")
            def_type = meta.get("def_type", "")
            def_name = meta.get("def_name", "")
            chunk_text = self.chunks[idx]

            rrf = (1.0 / (60.0 + stats["dense_rank"])) + (1.0 / (60.0 + stats["sparse_rank"]))
            if def_type in requested_types:
                rrf += 0.015
            if stats["dense_sim"] > 0.4:
                rrf += 0.005

            max_rrf_score = max(max_rrf_score, rrf)
            scored_results.append((
                rrf,
                source_file,
                chunk_text,
                def_type,
                def_name,
                stats["dense_sim"],
                stats["sparse_score"],
            ))

        scored_results.sort(key=lambda x: x[0], reverse=True)

        # Compute Confidence Guardrail
        retrieval_confidence = min(max_rrf_score * 30.0, 1.0)
        is_general_query = (retrieval_confidence < 0.18 and not has_override)

        added = 0
        top_chunks_meta = []
        for rrf_score, source_file, chunk_text, def_type, def_name, d_sim, s_score in scored_results:
            if added >= top_k:
                break

            tokens = _tokenize(chunk_text)
            is_duplicate = False
            for prev_tokens in seen_token_sets:
                union = tokens | prev_tokens
                if not union:
                    continue
                jaccard = len(tokens & prev_tokens) / len(union)
                if jaccard > 0.75:
                    is_duplicate = True
                    break
            if is_duplicate:
                continue
            seen_token_sets.append(tokens)

            label = f"{source_file}"
            if def_type and def_type not in ("Text", "Preamble"):
                label += f" [{def_type}: {def_name}]" if def_name else f" [{def_type}]"

            matched_context.append(
                f"--- SOURCE: {label} (RRF: {rrf_score:.4f} | Dense: {d_sim:.3f} | Sparse: {s_score:.1f}) ---\n{chunk_text}\n"
            )
            if source_file not in source_files:
                source_files.append(source_file)
            top_chunks_meta.append({
                "file": source_file,
                "def_type": def_type,
                "def_name": def_name,
                "rrf_score": round(rrf_score, 4),
                "dense_sim": round(d_sim, 3),
                "sparse_score": round(s_score, 2),
            })
            added += 1

        context_str = "\n\n".join(matched_context)
        retrieval_metrics = {
            "confidence": round(retrieval_confidence, 3),
            "is_general_query": is_general_query,
            "top_chunks": top_chunks_meta,
            "total_candidates_scored": len(candidate_scores),
        }

        if return_sources and return_metrics:
            return context_str, source_files, retrieval_metrics
        elif return_sources:
            return context_str, source_files
        elif return_metrics:
            return context_str, retrieval_metrics
        return context_str


def clean_thinking_tags(text):
    """Remove <think>...</think> blocks from model output and return (thinking, answer)."""
    if "<think>" in text and "</think>" in text:
        think_match = re.search(r"<think>(.*?)</think>", text, re.DOTALL)
        thinking = think_match.group(1).strip() if think_match else ""
        answer = re.sub(r"<think>.*?</think>", "", text, flags=re.DOTALL).strip()
        return thinking, answer
    return "", text


def extract_tdl_code_blocks(text):
    """Pull out the contents of ```tdl ... ``` (or bare ``` ... ```) fenced
    code blocks from a model response."""
    blocks = re.findall(r"```(?:tdl)?\s*\n(.*?)```", text, re.DOTALL | re.IGNORECASE)
    return [b.strip() for b in blocks if b.strip()]


def validate_tdl_code(code):
    """Lightweight structural validator for generated TDL code.

    This is NOT a full TDL parser — Tally doesn't publish one — but it
    catches the failure modes that actually show up in LLM-generated TDL:
    unbalanced brackets/parentheses, malformed definition headers, and
    code that claims to be TDL but contains no recognizable definition
    at all. Returns a list of human-readable issue strings (empty = OK).
    """
    issues = []
    if not code or not code.strip():
        return ["No TDL code was found in the response."]

    # 1. Bracket balance — TDL structure lives entirely inside [ ... ]
    if code.count("[") != code.count("]"):
        issues.append(
            f"Unbalanced square brackets: {code.count('[')} '[' vs {code.count(']')} ']'."
        )

    # 2. Parenthesis balance — used in expressions and function calls
    if code.count("(") != code.count(")"):
        issues.append(
            f"Unbalanced parentheses: {code.count('(')} '(' vs {code.count(')')} ')'."
        )

    # 3. At least one recognizable top-level definition
    headers = DEFINITION_HEADER_RE.findall(code)
    if not headers:
        issues.append(
            "No recognized TDL definition header found "
            "(expected something like [Report: Name], [Form: Name], etc.)."
        )

    # 4. Every '[' line that looks like a header should have a colon
    for line_no, line in enumerate(code.splitlines(), 1):
        stripped = line.strip()
        if stripped.startswith("[") and stripped.endswith("]") and ":" not in stripped:
            issues.append(f"Line {line_no}: bracketed definition missing ':' — '{stripped}'")

    # 5. Interface hierarchy check (Report -> Form -> Part -> Line -> Field)
    def_types_upper = {h[0].upper() if isinstance(h, tuple) else h.upper() for h in headers}
    if "REPORT" in def_types_upper:
        if not ("FORM" in def_types_upper or re.search(r"^\s*Form\s*:", code, re.IGNORECASE | re.MULTILINE)):
            issues.append("Hierarchy Warning: [Report] definition should specify or reference a Form.")
    if "FORM" in def_types_upper:
        if not ("PART" in def_types_upper or re.search(r"^\s*Part\s*:", code, re.IGNORECASE | re.MULTILINE)):
            issues.append("Hierarchy Warning: [Form] definition should specify or reference a Part.")
    if "PART" in def_types_upper:
        if not ("LINE" in def_types_upper or re.search(r"^\s*Line\s*:", code, re.IGNORECASE | re.MULTILINE)):
            issues.append("Hierarchy Warning: [Part] definition should specify or reference a Line.")

    return issues


def build_repair_prompt(original_code, issues):
    """Build a follow-up user message asking the model to fix specific,
    named structural problems in the TDL code it just produced."""
    issue_list = "\n".join(f"- {i}" for i in issues)
    return (
        "The TDL code you just produced failed an automated structural check with these issues:\n\n"
        f"{issue_list}\n\n"
        "Please regenerate the COMPLETE, corrected TDL code only (fix these exact issues "
        "while keeping everything else that was already correct). "
        "Wrap it in a single ```tdl code block."
    )


def check_dangling_references(code):
    """Inspect TDL code for references to custom components (like Forms, Parts, Lines, Fields)
    that are not defined within the snippet or standard known symbols."""
    warnings = []
    if not code:
        return warnings
    defined = set()
    for header in DEFINITION_HEADER_RE.findall(code):
        defined.add(header[1])
    header_pattern = re.compile(r"\[\s*([A-Za-z0-9_]+)\s*:\s*([A-Za-z0-9_]+)\s*\]", re.IGNORECASE)
    for match in header_pattern.findall(code):
        defined.add(match[1])

    ref_pattern = re.compile(r"^\s*(?:Form|Part|Line|Field)\s*:\s*([A-Za-z0-9_]+)", re.IGNORECASE | re.MULTILINE)
    for match in ref_pattern.findall(code):
        ref_name = match
        if ref_name not in defined:
            warnings.append(f"Dangling reference detected: '{ref_name}' is referenced but not defined in this block.")
    return warnings


def check_attribute_scopes(code):
    """Check that attributes are used within their valid definition types (e.g., 'Set As' only in Field/Variable)."""
    warnings = []
    if not code:
        return warnings
    current_def = None
    header_pattern = re.compile(r"\[\s*([A-Za-z0-9_]+)\s*:\s*([A-Za-z0-9_]+)\s*\]", re.IGNORECASE)
    for line_no, line in enumerate(code.splitlines(), 1):
        stripped = line.strip()
        m = header_pattern.match(stripped)
        if m:
            current_def = m.group(1).upper()
        elif current_def and re.match(r"^\s*Set\s+As\s*:", line, re.IGNORECASE):
            if current_def not in ("FIELD", "VARIABLE"):
                warnings.append(f"Scope Error (Line {line_no}): 'Set As' attribute is only valid inside [Field] or [Variable] definitions, found under [{current_def}].")
    return warnings


def prune_and_summarize_memory(history, max_turns=4):
    """Prune conversation history while retaining a structured system memory digest of older turns."""
    if len(history) <= max_turns:
        return history
    recent = history[-max_turns:]
    older = history[:-max_turns]
    summaries = []
    for msg in older:
        role = msg.get("role", "unknown")
        content = msg.get("content", "")
        short_content = (content[:80] + "...") if len(content) > 80 else content
        summaries.append(f"[{role}]: {short_content}")
    digest_text = "System Memory Digest (Summary of earlier conversation):\n" + "\n".join(summaries)
    digest_msg = {"role": "system", "content": digest_text}
    return [digest_msg] + recent


def validate_and_refine_tdl(code):
    """Remove repetitive separator/filler loops and validate code structural integrity."""
    if not code:
        return False, "", {"status": "FAIL", "issues": ["Empty TDL code."]}
    lines = code.splitlines()
    refined_lines = []
    prev_was_separator = False
    for line in lines:
        stripped = line.strip()
        is_sep = bool(re.match(r"^;[-=]+$", stripped))
        if is_sep:
            if not prev_was_separator:
                refined_lines.append(line)
                prev_was_separator = True
        else:
            refined_lines.append(line)
            prev_was_separator = False
    refined_code = "\n".join(refined_lines)
    if code.endswith("\n"):
        refined_code += "\n"

    syntax_issues = validate_tdl_code(refined_code)
    dangling_issues = check_dangling_references(refined_code)
    scope_issues = check_attribute_scopes(refined_code)
    all_issues = syntax_issues + dangling_issues + scope_issues

    is_valid = len(syntax_issues) == 0
    status = "PASS" if len(all_issues) == 0 else ("WARNING" if is_valid else "FAIL")
    report = {
        "status": status,
        "issues": all_issues,
        "syntax_issues": syntax_issues,
        "dangling_warnings": dangling_issues,
        "scope_warnings": scope_issues,
    }
    return is_valid, refined_code, report


# ─────────────────────────────────────────────────────────────────────
# TDL Principal Engineer AI System Prompt & Permanent Teaching Memory
# ─────────────────────────────────────────────────────────────────────

def load_permanent_teachings(filepath="permanent_teachings.json"):
    """Load permanent user-taught rules and overrides so the AI remembers them correctly forever."""
    if not os.path.exists(filepath):
        return []
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data if isinstance(data, list) else []
    except Exception:
        return []


def add_permanent_teaching(rule_text, filepath="permanent_teachings.json"):
    """Permanently store a rule taught by the user."""
    teachings = load_permanent_teachings(filepath)
    if rule_text not in teachings:
        teachings.append(rule_text)
        try:
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(teachings, f, indent=2)
        except Exception as e:
            print(f"[ERROR] Failed to save permanent teaching: {e}")
    return teachings


def compute_adaptive_generation_params(user_query, retrieval_metrics=None):
    """Inspect what the user is asking and check embedding retrieval confidence
    to automatically adjust AI generation hyperparameters (temperature, top_p, mode)
    for optimal output quality."""
    q = user_query.lower()
    confidence = retrieval_metrics.get("confidence", 0.5) if retrieval_metrics else 0.5

    technical_keywords = [
        "report", "form", "part", "line", "field", "collection", "tdl",
        "code", "syntax", "fix", "error", "write", "create", "[report",
        "[form", "cust_", "function", "menu", "alter",
    ]
    if any(kw in q for kw in technical_keywords) or confidence >= 0.65:
        return {
            "mode": "Deterministic TDL Code Engine",
            "temperature": 0.15,
            "top_p": 0.85,
            "max_tokens": 4096,
            "reason": f"High precision syntax required (Confidence: {confidence*100:.1f}%)"
        }

    creative_keywords = ["idea", "roadmap", "brainstorm", "suggest", "future", "architecture", "design", "what if"]
    if any(kw in q for kw in creative_keywords):
        return {
            "mode": "Creative Exploration Mode",
            "temperature": 0.65,
            "top_p": 0.95,
            "max_tokens": 4096,
            "reason": "Exploratory reasoning & creative idea generation"
        }

    return {
        "mode": "Balanced Universal Gemini Mode",
        "temperature": 0.35,
        "top_p": 0.90,
        "max_tokens": 4096,
        "reason": "Universal explanation & analytical reasoning"
    }


SYSTEM_PROMPT_TEMPLATE = """You are the TDL Principal Engineer AI — the most reliable Tally Definition Language expert available, with encyclopedic command of TDL syntax, the Tally object model (Report -> Form -> Part -> Line -> Field), Collections, Functions, Menus, Actions, and the patterns used in real production Tally Prime / Tally ERP 9 add-ons.

## MISSION
Every response must be immediately usable: correct TDL syntax, zero hallucinated definitions, zero placeholders, ready to paste into a .tdl file and load in Tally without a parsing error.

## HOW TO THINK (internal only — never show this process to the user)
Before writing the final answer, silently:
1. Identify exactly which TDL objects are being requested and how they must nest (Report -> Form -> Part -> Line -> Field, or Collection/Function/Menu as applicable).
2. Check the Repository Context below for existing patterns, naming conventions, or SYSTEM OVERRIDE rules that must take precedence.
3. Draft the object hierarchy top-down before writing any code, so no level is skipped or mis-nested.
4. Mentally compile-check: matched brackets, valid attribute names, correct casing, unique prefixed names, no undefined variable/UDF/Field references.
5. Only after that checklist passes internally do you write the final response. Never narrate these steps, show reasoning, or say things like "let me think" — jump straight to the answer.

## OUTPUT FORMAT (CRITICAL)
- No visible reasoning or meta-commentary about your process.
- One crisp sentence describing what the code does, then the complete code in a single ```tdl block.
- Add a short "Notes" section ONLY if there's a genuine caveat, dependency, or assumption the user needs to know — omit it otherwise. Do not pad the response.

## GROUNDING RULES (in strict priority order)
1. SYSTEM OVERRIDE rules in the Repository Context, if present, outrank every other rule in this prompt.
2. Repository Context second: if it contains a relevant existing [Report]/[Form]/[Collection]/etc., reuse its naming, structure, and idioms rather than inventing new ones. Prefer modifying via the # (alter) modifier over redefining from scratch.
3. General TDL expertise third: if the context doesn't cover the request, answer anyway with correct standard TDL. Never refuse, and never claim "not enough information" for something a competent TDL developer would simply know how to do.
4. Only if the request is genuinely ambiguous in a way that would change the correct code — state your single most reasonable assumption in one line and proceed. Do not stop to ask unless truly blocked.

## NON-NEGOTIABLE SYNTAX RULES
- Every custom Definition, Variable, and UDF MUST carry a unique developer prefix (e.g. CUST_, MYCO_) to avoid colliding with Tally's built-in objects.
- UPPERCASE for actions/operators (DISPLAY, AND, OR, IF); Sentence case for structural keywords (Set, Add, Delete); Proper Case for attribute names (Set As, Background, Local Formula).
- Strictly respect the interface hierarchy: never reference a Field that isn't reachable through a defined Line -> Part -> Form -> Report chain.
- Align colons and indent nested definitions — a hard formatting requirement, not a suggestion.
- Never invent attribute, function, or system-variable names that don't exist in TDL. If unsure of the exact name, use the closest well-known standard one and flag the assumption instead of fabricating.
- Never emit duplicate blocks, repeated boilerplate, or filler separator lines. Every definition appears exactly once.
- Always wire in [#Menu: Gateway of Tally] (or the relevant existing menu) so the feature is reachable, unless the user explicitly asked for a fragment only.
- Deliver complete, compilable code — no "...", no "add your logic here" placeholders, ever.

## SELF-VERIFICATION CHECKLIST (apply silently before sending — never print this list)
- Every [Type: Name] opens and closes correctly and nests under the right parent.
- Every custom name carries a unique prefix.
- No undefined variables, UDFs, Collections, or Fields are referenced.
- Casing convention followed throughout.
- This code would load in Tally Prime without a "TDL parsing error" or "Unknown attribute" warning.
- The response answers exactly what was asked — no scope creep, nothing missing.

## SYSTEM OVERRIDE RULES & PERMANENT USER TEACHINGS (Highest Priority)
Any SYSTEM OVERRIDE instructions found in the Repository Context or Permanent Teachings below outrank every rule above:
{permanent_teachings}

## Repository Context (Retrieved via RAG)
{context}"""

GENERAL_GEMINI_PROMPT_TEMPLATE = """You are TDL Quantum AI Studio — powered by expert Gemini-class universal intelligence and deep Tally Definition Language (TDL) mastery.

## YOUR CAPABILITIES
1. **Universal Knowledge**: You answer ANY type of question accurately, thoroughly, and clearly — whether it is general software engineering, AI, business, mathematics, science, logic, or conversation — just like Gemini.
2. **TDL Domain Mastery**: Whenever the user asks anything about Tally Prime, ERP 9, or TDL customizations, you act as the world's foremost TDL architect, delivering production-ready, zero-hallucination code adhering to strict structural hierarchy (Report -> Form -> Part -> Line -> Field).

## SYSTEM OVERRIDE RULES & PERMANENT USER TEACHINGS (Highest Priority)
{permanent_teachings}

## STRICT OUTPUT RULES
- Do NOT show internal think blocks in output. Jump directly to an insightful, professional response.
- When answering general questions, provide rich, authoritative, well-structured explanations.
- When generating or analyzing TDL code, follow strict TDL casing, unique developer prefixes, aligned colons, balanced brackets, and NEVER generate endless filler loops.

## Repository Context (if applicable)
{context}"""


def build_system_prompt(context, is_general_query=False):
    if not context or not context.strip():
        context = "(No specific repository files matched this query. Using expert domain & universal knowledge.)"
    teachings = load_permanent_teachings()
    teach_str = "\n".join(f"- {t}" for t in teachings) if teachings else "(No permanent override rules taught yet.)"
    if is_general_query:
        return GENERAL_GEMINI_PROMPT_TEMPLATE.format(context=context, permanent_teachings=teach_str)
    return SYSTEM_PROMPT_TEMPLATE.format(context=context, permanent_teachings=teach_str)


def start_chat():
    if client is None:
        print(f"\n[FATAL] {_API_KEY_ERROR}\n")
        return

    memory = MultiLevelAgentMemory()
    conversation_history = []
    last_bot_response = ""

    print("\n" + "=" * 60)
    print(f"  TDL Expert Bot ({MODEL_NAME}) is Online.")
    print("  RAG + definition-type boosting + auto syntax check enabled.")
    print("=" * 60 + "\n")

    while True:
        try:
            user_input = input("You: ").strip()
            if not user_input:
                continue
            if user_input.lower() in ["exit", "quit", "q"]:
                print("\n[System] Session ended. Goodbye!")
                break

            if memory.learn_from_user(user_input, last_bot_response):
                print("[System: Override logic saved.]")

            print("-> [Agent 1] Performing semantic vector search...")
            context = memory.retrieve_context(user_input)
            if not context.strip():
                print("-> [Agent 1] No matching context found. Using general TDL knowledge.")

            system_prompt = build_system_prompt(context)
            messages = [{"role": "system", "content": system_prompt}]
            messages.extend(conversation_history[-4:])
            messages.append({"role": "user", "content": user_input})

            print(f"-> [Agent 2] Generating response with {MODEL_NAME}...")
            full_response = _stream_completion(messages)

            # ── Self-repair pass: validate any TDL code and fix once if broken ──
            code_blocks = extract_tdl_code_blocks(full_response)
            if code_blocks:
                issues = validate_tdl_code(code_blocks[0])
                if issues:
                    print(f"\n-> [Validator] {len(issues)} issue(s) found. Requesting one auto-repair pass...")
                    for issue in issues:
                        print(f"     - {issue}")
                    repair_messages = messages + [
                        {"role": "assistant", "content": full_response},
                        {"role": "user", "content": build_repair_prompt(code_blocks[0], issues)},
                    ]
                    print()
                    full_response = _stream_completion(repair_messages)

            if not full_response.strip():
                full_response = "I wasn't able to generate a response. Please try rephrasing your question."
                print(f"\nTDL AI:\n{full_response}\n")

            last_bot_response = full_response
            conversation_history.append({"role": "user", "content": user_input})
            conversation_history.append({"role": "assistant", "content": full_response})

        except KeyboardInterrupt:
            print("\n\n[System] Interrupted. Type 'exit' to quit.")
        except Exception as e:
            print(f"\n[CRITICAL ERROR] {e}")
            print(traceback.format_exc())


def _stream_completion(messages, temperature=0.4, top_p=0.9, max_tokens=8192, fallback_count=0):
    """Stream a completion to stdout (CLI use) and return the full text.

    Note: temperature defaults to 0.4 here (down from the original 1.0).
    For code generation, lower temperature substantially reduces syntax
    errors and inconsistent naming — creativity is not a virtue when the
    output has to compile.
    """
    global MODEL_NAME
    import time
    try:
        completion = client.chat.completions.create(
            model=MODEL_NAME,
            messages=messages,
            temperature=temperature,
            top_p=top_p,
            max_tokens=max_tokens,
            extra_body={"chat_template_kwargs": {"enable_thinking": True, "clear_thinking": False}},
            stream=True,
        )

        content_parts = []
        for chunk in completion:
            if not getattr(chunk, "choices", None):
                continue
            if len(chunk.choices) == 0 or getattr(chunk.choices[0], "delta", None) is None:
                continue
            delta = chunk.choices[0].delta

            if getattr(delta, "reasoning_content", None) is not None:
                print(f"{_REASONING_COLOR}{delta.reasoning_content}{_RESET_COLOR}", end="", flush=True)
            if getattr(delta, "content", None) is not None:
                content_parts.append(delta.content)
                print(delta.content, end="", flush=True)
        print()

        full_response = "".join(content_parts)
        if "<think>" in full_response:
            _, full_response = clean_thinking_tags(full_response)
        return full_response
    except Exception as e:
        err_str = str(e)
        if fallback_count < 2 and any(k in err_str for k in [
            "ResourceExhausted", "limit reached", "request limit", "Worker local",
            "429", "RateLimit", "rate limit", "too many requests", "overloaded",
            "400", "DEGRADED", "500", "502", "503", "504", "10054", "connection closed", "timeout"
        ]):
            backup = "meta/llama-3.1-70b-instruct" if MODEL_NAME != "meta/llama-3.1-70b-instruct" else "meta/llama-3.3-70b-instruct"
            print(f"\n[Warning] Model `{MODEL_NAME}` returned error ({err_str.splitlines()[0]}). Automatically switching to backup model `{backup}`...")
            MODEL_NAME = backup
            time.sleep(1.0)
            return _stream_completion(messages, temperature, top_p, max_tokens, fallback_count=fallback_count + 1)
        raise e


if __name__ == "__main__":
    start_chat()