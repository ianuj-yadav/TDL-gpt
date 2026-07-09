# Project-Scoped Rules for TDL Enterprise Assistant

### Rule: Tier 3 RAG & Zero-Hallucination Guardrails for Domain-Specific Code Assistants
When building, modifying, or fine-tuning RAG-based AI assistants and code generators for domain-specific languages (e.g., TDL):
1. **Multi-Stage Tier 3 Retrieval (RRF)**:
   - Always implement a hybrid retrieval pipeline combining **Sparse Lexical Search (BM25/TF-IDF)** for exact technical tokens/syntax with **Dense Semantic Vector Search (FAISS/SentenceTransformers)** for conceptual matching.
   - Fuse results using **Reciprocal Rank Fusion (RRF)** and apply a confidence threshold to filter out noise before prompt assembly.
2. **Autonomous Intent & Correction Guardrails**:
   - Never use naive keyword matching (e.g., matching `"change"`, `"update"`, `"fix"`) to capture user override rules or memory.
   - Always implement structured intent classification to differentiate normal development queries ("how to update ledger") from explicit behavioral corrections ("[RULE: use X instead of Y]").
3. **Post-Generation Code Validation**:
   - Implement an autonomous validator (Agent 3) that inspects LLM-generated code against strict domain grammar rules (e.g., interface hierarchy: `Report -> Form -> Part -> Line -> Field` in TDL, balanced brackets, unique developer prefixes).
   - Filter out repetitive filler loops (e.g., endless separator lines) and flag syntax warnings before presenting solutions to the user.
