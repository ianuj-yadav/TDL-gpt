import os
import re
import io
import json
import hashlib
import numpy as np
import faiss
from datetime import datetime
from sentence_transformers import SentenceTransformer
from app.core.config import BASE_DIR

EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"
_embedder_cache = None

def get_embedder():
    global _embedder_cache
    if _embedder_cache is None:
        _embedder_cache = SentenceTransformer(EMBEDDING_MODEL_NAME)
    return _embedder_cache

TDL_DEFINITION_TYPES = (
    "Report", "Form", "Part", "Line", "Field", "Collection", "Function",
    "Menu", "System", "Variable", "Key", "Button", "Object", "Attribute",
    "Table", "TDL", "Yes", "No"
)

DEFINITION_HEADER_RE = re.compile(
    r"^\s*\[\s*#?\s*(?P<type>" + "|".join(TDL_DEFINITION_TYPES) + r")\s*:\s*(?P<name>[^\]]+)\]",
    re.IGNORECASE,
)

def extract_printable_strings(raw_bytes: bytes, min_len: int = 4) -> str:
    result = []
    curr = []
    for b in raw_bytes:
        if 32 <= b <= 126 or b in (9, 10, 13):
            curr.append(chr(b))
        else:
            if len(curr) >= min_len:
                result.append("".join(curr))
            curr = []
    if len(curr) >= min_len:
        result.append("".join(curr))
    return "\n".join(result)

def read_bytes_content(file_bytes: bytes, filename: str) -> str:
    ext = os.path.splitext(filename)[1].lower()
    try:
        text = file_bytes.decode("utf-8")
        return text
    except UnicodeDecodeError:
        try:
            return file_bytes.decode("latin-1")
        except Exception:
            return extract_printable_strings(file_bytes)

def read_file_content(path: str) -> str:
    with open(path, "rb") as f:
        data = f.read()
    return read_bytes_content(data, os.path.basename(path))

def chunk_tdl_source(text: str, filename: str, target_chunk_size: int = 1500) -> list:
    lines = text.splitlines(keepends=True)
    chunks = []
    curr_def_lines = []
    curr_def_type = None
    curr_def_name = None

    def flush_curr(def_type, def_name, l_list):
        if not l_list:
            return
        body = "".join(l_list).strip()
        if not body:
            return
        if len(body) <= target_chunk_size * 2:
            chunks.append({
                "text": body,
                "def_type": def_type,
                "def_name": def_name,
                "file": filename,
            })
        else:
            sublines = body.splitlines(keepends=True)
            acc = []
            acc_len = 0
            for sl in sublines:
                acc.append(sl)
                acc_len += len(sl)
                if acc_len >= target_chunk_size:
                    chunks.append({
                        "text": "".join(acc).strip(),
                        "def_type": def_type,
                        "def_name": def_name,
                        "file": filename,
                    })
                    acc = []
                    acc_len = 0
            if acc:
                chunks.append({
                    "text": "".join(acc).strip(),
                    "def_type": def_type,
                    "def_name": def_name,
                    "file": filename,
                })

    for line in lines:
        m = DEFINITION_HEADER_RE.match(line)
        if m:
            if curr_def_lines:
                flush_curr(curr_def_type, curr_def_name, curr_def_lines)
                curr_def_lines = []
            curr_def_type = m.group("type").strip()
            curr_def_name = m.group("name").strip()
        curr_def_lines.append(line)

    if curr_def_lines:
        flush_curr(curr_def_type, curr_def_name, curr_def_lines)

    return chunks

def chunk_text(text: str, filename: str, chunk_size: int = 1000, overlap: int = 150) -> list:
    chunks = []
    start = 0
    tlen = len(text)
    while start < tlen:
        end = start + chunk_size
        ctext = text[start:end].strip()
        if ctext:
            chunks.append({
                "text": ctext,
                "def_type": None,
                "def_name": None,
                "file": filename,
            })
        start += (chunk_size - overlap)
    return chunks

def chunk_any_content(text: str, filename: str) -> list:
    ext = os.path.splitext(filename)[1].lower()
    if ext in (".tdl", ".txt") or "report" in text.lower() or "[" in text:
        return chunk_tdl_source(text, filename)
    return chunk_text(text, filename)

def build_kb_index(
    source_dir: str,
    index_file: str = os.path.join(BASE_DIR, "tdl_index.faiss"),
    meta_file: str = os.path.join(BASE_DIR, "tdl_chunks.json")
):
    all_chunks = []
    files_indexed = []
    
    if not os.path.exists(source_dir):
        os.makedirs(source_dir, exist_ok=True)

    for root, _, files in os.walk(source_dir):
        for fname in files:
            fpath = os.path.join(root, fname)
            try:
                content = read_file_content(fpath)
                if content and len(content.strip()) > 10:
                    c_list = chunk_any_content(content, fname)
                    all_chunks.extend(c_list)
                    files_indexed.append({
                        "filename": fname,
                        "chunks": len(c_list),
                        "path": fpath,
                    })
            except Exception as e:
                print(f"Error processing {fname}: {e}")

    if not all_chunks:
        # Fallback dummy chunk if folder is empty
        all_chunks.append({
            "text": "[Report: StandardReport]\n Form: StandardForm\n",
            "def_type": "Report",
            "def_name": "StandardReport",
            "file": "system_default.tdl"
        })
        files_indexed.append({"filename": "system_default.tdl", "chunks": 1, "path": "internal"})

    texts = [c["text"] for c in all_chunks]
    embedder = get_embedder()
    embeddings = embedder.encode(texts, show_progress_bar=False, convert_to_numpy=True)
    embeddings = embeddings / np.maximum(np.linalg.norm(embeddings, axis=1, keepdims=True), 1e-12)
    embeddings = embeddings.astype(np.float32)

    dim = embeddings.shape[1]
    faiss_index = faiss.IndexFlatIP(dim)
    faiss_index.add(embeddings)

    faiss.write_index(faiss_index, index_file)
    with open(meta_file, "w", encoding="utf-8") as f:
        json.dump(all_chunks, f, indent=2)

    return {
        "total_files": len(files_indexed),
        "total_chunks": len(all_chunks),
        "dim": dim,
        "files": files_indexed
    }
