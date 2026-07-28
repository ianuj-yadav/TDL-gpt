import os
import json
import re
import numpy as np
from typing import List, Dict, Tuple, Any
from openai import OpenAI

from app.core.config import settings, BASE_DIR

try:
    from sentence_transformers import SentenceTransformer
    HAS_SENTENCE_TRANSFORMERS = True
except ImportError:
    HAS_SENTENCE_TRANSFORMERS = False
    SentenceTransformer = None

try:
    import faiss
    HAS_FAISS = True
except ImportError:
    HAS_FAISS = False
    faiss = None

EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"
_embedder = None

def get_embedder():
    global _embedder
    if not HAS_SENTENCE_TRANSFORMERS:
        return None
    if _embedder is None:
        _embedder = SentenceTransformer(EMBEDDING_MODEL_NAME)
    return _embedder

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

DEF_TYPE_HINTS = {
    "report": "Report", "form": "Form", "part": "Part", "line": "Line",
    "field": "Field", "collection": "Collection", "function": "Function",
    "udf": "Function", "menu": "Menu", "button": "Key", "key": "Key",
    "variable": "Variable", "system": "System", "object": "Object",
    "attribute": "Attribute", "table": "Table",
}

def expand_query(user_query: str) -> str:
    terms = [w.lower().strip(".,?!") for w in user_query.split()]
    extra = []
    for t in terms:
        if t in TDL_SYNONYMS:
            extra.extend(TDL_SYNONYMS[t])
    if not extra:
        return user_query
    return user_query + " " + " ".join(extra)

def lexical_bm25_retrieve(query: str, chunks: List[Dict], top_k: int = 5) -> Tuple[List[Dict], float]:
    if not chunks:
        return [], 0.0
    query_terms = set(re.findall(r"\w+", query.lower()))
    if not query_terms:
        return [], 0.0

    scored_chunks = []
    max_score = 0.0

    for chunk in chunks:
        text = chunk.get("text", "").lower()
        def_name = (chunk.get("def_name") or "").lower()
        def_type = (chunk.get("def_type") or "").lower()
        score = 0.0

        for term in query_terms:
            if term in text:
                score += 1.0 + (text.count(term) * 0.2)
            if term in def_name:
                score += 3.0
            if term in def_type:
                score += 2.0

        if score > max_score:
            max_score = score

        if score > 0:
            scored_chunks.append((score, chunk))

    scored_chunks.sort(key=lambda x: x[0], reverse=True)
    results = [c[1] for c in scored_chunks[:top_k]]
    norm_score = min(max_score / (len(query_terms) * 5.0), 1.0) if query_terms else 0.0
    return results, norm_score

def get_nvidia_client(api_key: str = None) -> OpenAI:
    key = api_key or settings.NVIDIA_API_KEY
    if not key:
        raise RuntimeError("No NVIDIA API key configured")
    return OpenAI(base_url="https://integrate.api.nvidia.com/v1", api_key=key)

class RagEngine:
    def __init__(
        self,
        index_file: str = os.path.join(BASE_DIR, "tdl_index.faiss"),
        meta_file: str = os.path.join(BASE_DIR, "tdl_chunks.json")
    ):
        self.index_file = index_file
        self.meta_file = meta_file
        self.index = None
        self.chunks = []
        self.load_index()

    def load_index(self):
        # Always try to load metadata chunks regardless of vector engine
        if os.path.exists(self.meta_file):
            try:
                with open(self.meta_file, "r", encoding="utf-8") as f:
                    self.chunks = json.load(f)
            except Exception as e:
                print(f"[RAG Engine Error] Failed loading chunks meta: {e}")
                self.chunks = []

        if HAS_FAISS and os.path.exists(self.index_file):
            try:
                self.index = faiss.read_index(self.index_file)
            except Exception as e:
                print(f"[RAG Engine Error] Failed loading FAISS index: {e}")
                self.index = None

    def retrieve(self, query: str, top_k: int = 5) -> Tuple[List[Dict], float]:
        if not self.chunks:
            return [], 0.0

        if not HAS_FAISS or not HAS_SENTENCE_TRANSFORMERS or not self.index:
            return lexical_bm25_retrieve(query, self.chunks, top_k)

        embedder = get_embedder()
        if not embedder:
            return lexical_bm25_retrieve(query, self.chunks, top_k)

        exp_q = expand_query(query)
        q_vec = embedder.encode([exp_q], convert_to_numpy=True)
        q_vec = q_vec / np.maximum(np.linalg.norm(q_vec, axis=1, keepdims=True), 1e-12)
        q_vec = q_vec.astype(np.float32)

        distances, indices = self.index.search(q_vec, min(top_k * 3, self.index.ntotal))

        results = []
        max_score = 0.0

        for dist, idx in zip(distances[0], indices[0]):
            if idx < 0 or idx >= len(self.chunks):
                continue
            chunk = self.chunks[idx]
            score = float(dist)
            if score > max_score:
                max_score = score
            results.append({
                "chunk": chunk,
                "score": score
            })

        results.sort(key=lambda x: x["score"], reverse=True)
        final_chunks = [r["chunk"] for r in results[:top_k]]
        return final_chunks, max_score

    def generate_response(
        self,
        query: str,
        rules: List[str] = None,
        model_name: str = None,
        api_key: str = None
    ) -> Dict[str, Any]:
        retrieved_chunks, confidence = self.retrieve(query)
        
        # Build context
        context_blocks = []
        for i, c in enumerate(retrieved_chunks, 1):
            file_info = c.get('file', 'source')
            def_info = f" ({c.get('def_type')}: {c.get('def_name')})" if c.get('def_type') else ""
            context_blocks.append(f"--- Chunk {i} [{file_info}{def_info}] ---\n{c['text']}")

        context_str = "\n\n".join(context_blocks) if context_blocks else "No direct source chunks retrieved."

        rules_str = ""
        if rules:
            rules_formatted = "\n".join([f"- {r}" for r in rules])
            rules_str = f"\n\nPERMANENT USER TEACHING RULES & OVERRIDES:\n{rules_formatted}\n"

        system_prompt = (
            "You are the Principal Engineer AI for Tally Definition Language (TDL) development (TDL-GPT).\n"
            "Produce syntactically valid, production-ready TDL code following Tally Object Model rules:\n"
            "Hierarchy: Report -> Form -> Part -> Line -> Field\n\n"
            "Use the provided context to guide definition names, attributes, and fields accurately.\n"
            f"{rules_str}\n"
            "RELEVANT CONTEXT CHUNKS:\n"
            f"{context_str}\n"
        )

        model = model_name or settings.DEFAULT_MODEL
        client = get_nvidia_client(api_key)

        temperature = 0.15 if "write" in query.lower() or "code" in query.lower() or "tdl" in query.lower() else 0.45

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": query}
        ]

        response = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=temperature,
            top_p=0.85,
        )

        reply_content = response.choices[0].message.content

        # Extract code blocks
        code_blocks = re.findall(r"```(?:tdl)?\n(.*?)```", reply_content, re.DOTALL)
        tdl_code = "\n\n".join(code_blocks) if code_blocks else ""

        return {
            "content": reply_content,
            "tdl_code": tdl_code,
            "confidence": confidence,
            "context_count": len(retrieved_chunks)
        }
