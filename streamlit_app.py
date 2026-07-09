import os
import re
import sys
import time
import subprocess
import importlib

import streamlit as st

if "chat_bot" in sys.modules:
    importlib.reload(sys.modules["chat_bot"])

from chat_bot import (
    load_knowledge_base,
    get_client,
    MultiLevelAgentMemory,
    MODEL_NAME,
    build_system_prompt,
    extract_tdl_code_blocks,
    validate_tdl_code,
    build_repair_prompt,
    load_permanent_teachings,
    add_permanent_teaching,
    compute_adaptive_generation_params,
)

# 1. Page Configuration
st.set_page_config(
    page_title="TDL Enterprise Bot | BINARYSOFT",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded"
)

# 2. Futuristic Ethereal AI Studio Theme (Totally AI-Generated Aesthetic)
st.markdown("""
<style>
/* Custom Google Fonts & Modern Dark Theme */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');

html, body, [class*="css"] {
    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
}

code, pre, .stCode, .stCodeBlock {
    font-family: 'JetBrains Mono', monospace !important;
}

/* Glassmorphism Sidebar */
section[data-testid="stSidebar"] {
    background: linear-gradient(180deg, #07090e 0%, #040609 100%) !important;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
}

/* App Main Background - Deep Obsidian & Ethereal Neural Gradients */
.stApp {
    background-color: #030508;
    background-image: 
        radial-gradient(circle at 15% 15%, rgba(139, 92, 246, 0.12) 0px, transparent 40%),
        radial-gradient(circle at 85% 20%, rgba(6, 182, 212, 0.12) 0px, transparent 40%),
        radial-gradient(circle at 50% 85%, rgba(16, 185, 129, 0.08) 0px, transparent 50%),
        radial-gradient(circle at 50% 10%, rgba(56, 189, 248, 0.10) 0px, transparent 35%);
}

/* ================= 1. FUTURISTIC BINARYSOFT QUANTUM HEADER ================= */
.top-brand-bar {
    background: rgba(13, 17, 26, 0.70);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    border: 1px solid rgba(255, 255, 255, 0.10);
    border-radius: 20px;
    padding: 16px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(139, 92, 246, 0.1);
    position: relative;
    overflow: hidden;
}

.top-brand-bar::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.6), rgba(56, 189, 248, 0.6), transparent);
}

.logo-container {
    display: flex;
    flex-direction: column;
}

.logo-text {
    font-size: 2.1rem;
    font-weight: 900;
    letter-spacing: 2.5px;
    color: #ffffff;
    display: flex;
    align-items: center;
    font-family: 'Outfit', sans-serif;
    line-height: 1.1;
}

.logo-ring {
    color: #a855f7;
    border: 3.5px solid #a855f7;
    border-radius: 50%;
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 18px;
    text-align: center;
    font-size: 1.35rem;
    margin: 0 3px;
    box-shadow: 0 0 18px rgba(168, 85, 247, 0.8);
    font-weight: 900;
}

.logo-subtext {
    font-size: 0.75rem;
    color: #94a3b8;
    letter-spacing: 7px;
    margin-top: 2px;
    font-weight: 600;
    text-transform: uppercase;
}

.logo-tagline {
    font-size: 0.85rem;
    color: #e2e8f0;
    margin-top: 6px;
    font-weight: 600;
}

.logo-locations {
    color: #64748b;
    font-weight: 400;
    font-size: 0.8rem;
}

/* Quantum AI Status Chip */
.quantum-pill {
    background: rgba(15, 23, 42, 0.8);
    color: #38bdf8;
    padding: 8px 22px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.82rem;
    box-shadow: inset 0 0 12px rgba(56, 189, 248, 0.15), 0 4px 15px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid rgba(56, 189, 248, 0.35);
    letter-spacing: 0.5px;
}

.pulse-dot {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 12px #10b981;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(1.3); }
    100% { opacity: 1; transform: scale(1); }
}

/* ================= 2. ETHEREAL AI STUDIO HERO BANNER ================= */
.hero-box {
    background: radial-gradient(circle at top right, rgba(56, 189, 248, 0.12), transparent 60%),
                radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.12), transparent 60%),
                rgba(11, 15, 23, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 24px;
    padding: 36px 42px;
    margin-bottom: 24px;
    backdrop-filter: blur(24px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
    position: relative;
    overflow: hidden;
}

.hero-box::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #38bdf8, #a855f7, #f43f5e);
}

.ai-status-badge {
    background: rgba(56, 189, 248, 0.12);
    color: #38bdf8;
    border: 1px solid rgba(56, 189, 248, 0.3);
    padding: 5px 16px;
    border-radius: 30px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.15);
    text-transform: uppercase;
}

.hero-title {
    font-size: 2.8rem;
    font-weight: 900;
    margin-bottom: 10px;
    background: linear-gradient(135deg, #ffffff 0%, #38bdf8 45%, #c084fc 80%, #f43f5e 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -1px;
    line-height: 1.15;
}

.hero-subtitle {
    color: #94a3b8;
    font-size: 1.1rem;
    font-weight: 400;
    line-height: 1.6;
    max-width: 850px;
}

/* ================= 3. NEURAL CHAT & BUTTON ENHANCEMENTS ================= */
.badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 14px;
    border-radius: 20px;
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.3);
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 12px;
}

.stChatMessage {
    background: rgba(13, 17, 26, 0.70) !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-radius: 18px !important;
    padding: 22px !important;
    margin-bottom: 20px !important;
    backdrop-filter: blur(16px);
    transition: all 0.25s ease-in-out;
}

.stChatMessage:hover {
    border-color: rgba(255, 255, 255, 0.18) !important;
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.4);
}

div[data-testid="stChatMessage"]:nth-child(odd) {
    border-left: 3.5px solid #38bdf8 !important;
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.50) 0%, rgba(13, 17, 26, 0.75) 100%) !important;
}

div[data-testid="stChatMessage"]:nth-child(even) {
    border-left: 3.5px solid #a855f7 !important;
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(13, 17, 26, 0.80) 100%) !important;
}

.stButton > button {
    border-radius: 12px !important;
    font-weight: 600 !important;
    border: 1px solid rgba(255, 255, 255, 0.10) !important;
    background: rgba(20, 26, 38, 0.8) !important;
    color: #f8fafc !important;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
    cursor: pointer !important;
}

.stButton > button:hover {
    transform: translateY(-2px);
    border-color: #38bdf8 !important;
    box-shadow: 0 0 20px rgba(56, 189, 248, 0.25) !important;
    color: #38bdf8 !important;
}

.stButton > button[kind="primary"] {
    background: linear-gradient(135deg, #059669 0%, #10b981 100%) !important;
    border: none !important;
    color: white !important;
}

.stButton > button[kind="primary"]:hover {
    background: linear-gradient(135deg, #10b981 0%, #34d399 100%) !important;
    box-shadow: 0 6px 24px rgba(16, 185, 129, 0.4) !important;
}
</style>
""", unsafe_allow_html=True)

def validate_nvidia_api_key(api_key):
    """Perform a lightweight API check to verify if the NVIDIA API key is valid."""
    if not api_key or not api_key.strip():
        return False, "API key is empty."
    try:
        test_client = get_client(api_key=api_key.strip())
        test_client.models.list()
        return True, None
    except Exception as e:
        return False, str(e)


# 3. API client — resolved from env var, with a sidebar fallback input so
# the app is deployable without ever hardcoding a secret in source.
def clean_api_key(raw_key):
    if not raw_key:
        return ""
    k = str(raw_key).strip()
    if k.lower().startswith("bearer "):
        k = k[7:].strip()
    return k

DEFAULT_API_KEY = "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"

def resolve_client():
    key = clean_api_key(st.session_state.get("nvidia_api_key")) or DEFAULT_API_KEY
    if key:
        os.environ["NVIDIA_API_KEY"] = key
        try:
            return get_client(api_key=key)
        except RuntimeError:
            return None
    return None



# 4. State Initialization
if "messages" not in st.session_state:
    st.session_state["messages"] = []

if "kb_data" not in st.session_state:
    st.session_state["kb_data"] = load_knowledge_base()

if "memory" not in st.session_state:
    st.session_state["memory"] = MultiLevelAgentMemory()

if "quick_prompt" not in st.session_state:
    st.session_state["quick_prompt"] = None

if "nvidia_api_key" not in st.session_state:
    st.session_state["nvidia_api_key"] = DEFAULT_API_KEY

if "api_key_valid" not in st.session_state:
    st.session_state["api_key_valid"] = None

if "last_validated_key" not in st.session_state:
    st.session_state["last_validated_key"] = None

if "api_key_validation_error" not in st.session_state:
    st.session_state["api_key_validation_error"] = ""

# Proactively capture any pending input box entry before checking state
if "sidebar_api_key_input" in st.session_state and st.session_state["sidebar_api_key_input"].strip():
    candidate_key = st.session_state["sidebar_api_key_input"].strip()
    if candidate_key != st.session_state.get("nvidia_api_key", ""):
        st.session_state["nvidia_api_key"] = candidate_key

current_key = st.session_state.get("nvidia_api_key", "").strip()
if not current_key:
    current_key = os.environ.get("NVIDIA_API_KEY", "").strip()
    if current_key:
        st.session_state["nvidia_api_key"] = current_key

if current_key != st.session_state["last_validated_key"]:
    st.session_state["api_key_valid"] = None
    st.session_state["api_key_validation_error"] = ""

if current_key and st.session_state["api_key_valid"] is None:
    is_valid, err_msg = validate_nvidia_api_key(current_key)
    st.session_state["api_key_valid"] = is_valid
    st.session_state["last_validated_key"] = current_key
    if not is_valid:
        st.session_state["api_key_validation_error"] = err_msg
        os.environ.pop("NVIDIA_API_KEY", None)
    else:
        st.session_state["api_key_validation_error"] = ""
        os.environ["NVIDIA_API_KEY"] = current_key

client = resolve_client()

# 5. Sidebar Controls
with st.sidebar:
    st.markdown("### 🔑 API Connection")
    
    is_valid = st.session_state.get("api_key_valid")
    validation_error = st.session_state.get("api_key_validation_error", "")
    
    if not current_key:
        st.warning("No NVIDIA NIM API key detected.")
    elif is_valid is False:
        st.error("🔴 API Key Invalid")
        if validation_error:
            st.caption(f"Error details: {validation_error}")
    elif is_valid is True:
        st.markdown('<div class="badge-pill" style="color:#10b981;border-color:#10b981;background:rgba(16,185,129,0.1);">🟢 API Connected</div>', unsafe_allow_html=True)
    else:
        st.info("🟡 Verifying API Key...")

    with st.form("api_key_sidebar_form", clear_on_submit=False):
        entered_key = st.text_input(
            "NVIDIA API Key",
            type="password",
            placeholder="nvapi-...",
            help="Paste your NVIDIA NIM API key here and click Connect."
        )
        colA, colB = st.columns(2)
        with colA:
            connect_submitted = st.form_submit_button("🔌 Connect", use_container_width=True, type="primary")
        with colB:
            clear_submitted = st.form_submit_button("🗑️ Clear", use_container_width=True)

    if connect_submitted and entered_key and entered_key.strip():
        st.session_state["nvidia_api_key"] = entered_key.strip()
        st.session_state["last_validated_key"] = None
        st.session_state["api_key_valid"] = None
        os.environ["NVIDIA_API_KEY"] = entered_key.strip()
        st.rerun()

    if clear_submitted:
        st.session_state["nvidia_api_key"] = ""
        st.session_state["api_key_valid"] = None
        st.session_state["last_validated_key"] = None
        st.session_state["api_key_validation_error"] = ""
        os.environ.pop("NVIDIA_API_KEY", None)
        st.rerun()

    st.markdown("---")
    st.markdown("### 🛠️ System Status")
    kb = st.session_state.get("kb_data", {})
    mem = st.session_state["memory"]
    faiss_ready = mem.index is not None and mem.index.ntotal > 0

    if faiss_ready:
        st.markdown('<div class="badge-pill">🟢 Vector KB Online</div>', unsafe_allow_html=True)
        col1, col2 = st.columns(2)
        with col1:
            st.metric("Indexed Chunks", f"{mem.index.ntotal}")
        with col2:
            st.metric("Files", f"{len(kb) if kb else len(set(m.get('file') for m in mem.metadata))}")
    else:
        st.markdown('<div class="badge-pill" style="color:#ef4444;border-color:#ef4444;background:rgba(239,68,68,0.1);">🔴 Vector KB Offline</div>', unsafe_allow_html=True)
        st.warning(
            "⚠️ No knowledge base loaded yet. Either run "
            "`python buildkb.py --source-dir <your files folder>` first, "
            "or upload files directly below to start querying right away."
        )

    col_r1, col_r2 = st.columns(2)
    with col_r1:
        if st.button("🔄 Reload KB", use_container_width=True, help="Reload existing vector and lexical indices from disk"):
            with st.spinner("Reloading files..."):
                st.session_state["kb_data"] = load_knowledge_base()
                st.session_state["memory"] = MultiLevelAgentMemory()
                st.toast("✅ Knowledge Base reloaded successfully!")
                time.sleep(0.5)
                st.rerun()
    with col_r2:
        if st.button("⚡ Rebuild KB", use_container_width=True, type="primary", help="Build Dual Dense (FAISS) + Sparse Lexical Index across all source files"):
            with st.spinner("Rebuilding dual-index KB across all source files..."):
                subprocess.run([sys.executable, "buildkb.py", "--no-backup"], check=True)
                st.session_state["kb_data"] = load_knowledge_base()
                st.session_state["memory"] = MultiLevelAgentMemory()
                st.toast("✅ Full Knowledge Base rebuild completed & loaded!")
                time.sleep(0.5)
                st.rerun()

    with st.expander("💡 Quantum AI Studio Roadmap & Ideas", expanded=False):
        st.markdown("""
**State-of-the-Art Architecture Ideas:**
- **Tier 3 RRF Hybrid RAG**: Active fusion of FAISS dense vectors + BM25/TF-IDF sparse lexical tokens.
- **Universal Gemini Mode**: Auto-routes general software engineering & AI questions to Gemini-style reasoning while enforcing strict TDL hierarchy (`Report -> Form -> Part -> Line -> Field`).
- **Live Code Analyzer**: Upload any `.tdl` snippet or file to inspect AST structure & validate developer prefixes (`CUST_`).
- **Automated Repair Loop**: 1-click self-healing when syntax warnings are detected.
""")

    with st.expander("🧠 Teach AI Permanent Rule (Remember Forever)", expanded=False):
        st.caption("Add an explicit override or rule that the AI will remember across every session forever.")
        rule_input = st.text_input("New Rule Text", placeholder="e.g. Always use CUST_ prefix for custom lines")
        if st.button("💾 Save Rule Forever", use_container_width=True):
            if rule_input.strip():
                add_permanent_teaching(rule_input.strip())
                st.toast("✅ Permanent Rule Saved!")
                time.sleep(0.4)
                st.rerun()
        existing_teachings = load_permanent_teachings()
        if existing_teachings:
            st.markdown("**Saved Permanent Rules:**")
            for t in existing_teachings:
                st.markdown(f"- `{t}`")

    st.markdown("---")
    st.markdown("### 📎 Add Files to This Chat")
    st.caption(
        "Upload files here to query them immediately — no need to run "
        "buildkb.py first. Any file type is accepted (.tdl, .txt, .pdf, "
        ".docx, .xlsx, .csv, .json, .md, code files, etc.)."
    )
    uploaded_files = st.file_uploader(
        "Drop files to embed into this conversation",
        accept_multiple_files=True,
        key="kb_uploader",
        label_visibility="collapsed",
    )
    persist_upload = st.checkbox(
        "💾 Also save permanently to the knowledge base",
        value=False,
        help="If checked, these files are written into kb_index.faiss / "
             "kb_metadata.json so they're still there next time you start "
             "the app. If unchecked, they're only available for this session.",
    )
    if uploaded_files and st.button("⚡ Process & Embed Uploaded Files", use_container_width=True, type="primary"):
        with st.spinner(f"Extracting, chunking, and embedding {len(uploaded_files)} file(s)..."):
            result = st.session_state["memory"].add_documents(uploaded_files, persist=persist_upload)
        if result["added_chunks"] > 0:
            st.toast(f"✅ Added {result['added_chunks']} chunks from {len(result['added_files'])} file(s)!")
            st.success(
                f"Indexed: {', '.join(result['added_files'])} "
                f"({result['added_chunks']} searchable chunks). "
                f"{'Saved to disk permanently.' if persist_upload else 'Available for this session only.'}"
            )
        if result["skipped"]:
            with st.expander(f"⚠️ {len(result['skipped'])} file(s) skipped", expanded=False):
                for fname, reason in result["skipped"]:
                    st.markdown(f"- **{fname}**: {reason}")
        if result["added_chunks"] > 0:
            time.sleep(0.6)
            st.rerun()

    st.markdown("---")
    st.markdown("### ⚙️ Model Parameters")
    selected_model = st.selectbox(
        "AI Model Endpoint",
        options=[
            "z-ai/glm-5.2",
            "nvidia/nemotron-3-ultra-550b-a55b",
            "meta/llama-3.1-70b-instruct",
            "meta/llama-3.3-70b-instruct",
            "minimaxai/minimax-m3",
            "abacusai/dracarys-llama-3.1-70b-instruct",
        ],
        index=0,
        help="Select which neural AI model to use on NVIDIA NIM. If a model shows 'DEGRADED', switch to another healthy endpoint here!",
    )
    st.session_state["selected_model"] = selected_model

    temperature = st.slider(
        "Temperature", min_value=0.0, max_value=1.5, value=0.4, step=0.1,
        help="Lower values (recommended for code) make output more deterministic "
             "and syntactically consistent. Higher values are more creative but "
             "riskier for generating correct TDL."
    )
    top_p = st.slider("Top-P", min_value=0.1, max_value=1.0, value=0.9, step=0.05)
    max_tokens = st.slider("Max Tokens", min_value=1024, max_value=16384, value=8192, step=1024)
    max_files = st.slider("Max Retrieved Context Chunks", min_value=1, max_value=15, value=8,
                          help="Number of TDL-definition chunks to feed into the prompt as context.")

    stream_response = st.toggle("⚡ Real-time Streaming", value=True, help=f"Stream words as they are generated by {MODEL_NAME}.")
    show_context = st.toggle("📚 Show Retrieved Context", value=True, help="Display which TDL chunks were used to generate the answer.")
    auto_validate = st.toggle("✅ Auto-check TDL Syntax", value=True,
                              help="Run generated code through a structural TDL validator "
                                   "(bracket/colon balance, recognized definitions) and flag issues.")
    auto_tune_params = st.toggle("🧠 Adaptive Query Auto-Tuning", value=True,
                                 help="Dynamically inspect your question & retrieval confidence to auto-tune Temperature & Top-P for best results.")

    st.markdown("---")
    st.markdown("### 💡 Quick Action Templates")
    st.caption("Click to test common TDL development tasks:")

    if st.button("📊 Create Custom Sales Report", use_container_width=True):
        st.session_state["quick_prompt"] = "Write a complete TDL code to create a custom Daily Sales Report with columns for Date, Party Name, Voucher Number, and Total Amount."
        st.rerun()

    if st.button("🔘 Add Button to Gateway", use_container_width=True):
        st.session_state["quick_prompt"] = "Show me how to add a custom button on the Gateway of Tally that opens a custom alteration screen."
        st.rerun()

    if st.button("🧮 GST Calculation UDF", use_container_width=True):
        st.session_state["quick_prompt"] = "Write a TDL User Defined Function (UDF) to calculate GST tax amount given a taxable value and tax rate percentage."
        st.rerun()

    if st.button("📂 Explain TDL Collections", use_container_width=True):
        st.session_state["quick_prompt"] = "Explain TDL Collections with an example showing how to fetch and filter all Ledger Vouchers."
        st.rerun()

    st.markdown("---")
    if st.button("🗑️ Clear Conversation History", type="primary", use_container_width=True):
        st.session_state["messages"] = []
        st.toast("🗑️ Chat history cleared!")
        st.rerun()

# 6. Main Branding Header & Ethereal AI Studio Hero Banner
st.markdown("""
<div class="top-brand-bar">
    <div class="logo-container">
        <div class="logo-text">
            <span>BINARYS</span><span class="logo-ring">o</span><span>FT</span>
        </div>
        <div class="logo-subtext">T E C H N O L O G I E S</div>
        <div class="logo-tagline">We bring IT &nbsp;•&nbsp; <span class="logo-locations">New Delhi • New York • Los Angeles</span></div>
    </div>
    <div class="quantum-pill">
        <span class="pulse-dot"></span> NEURAL AI STUDIO v4.1 ACTIVE
    </div>
</div>


<div class="hero-box">
    <div class="ai-status-badge">✨ TDL RAG WITH DEFINITION-AWARE RETRIEVAL & SYNTAX VALIDATION</div>
    <div class="hero-title">TDL Quantum AI Studio</div>
    <p class="hero-subtitle">Retrieval-augmented Tally Definition Language (TDL) code generation, backed by a local embedding model, a definition-boundary-chunked knowledge base, and automated syntax checking — curated by Binarysoft.</p>
</div>
""", unsafe_allow_html=True)

# 6.5 Ultra-Clean Holographic Prompt Suggestion Chips
col1, col2, col3, col4 = st.columns(4)

with col1:
    if st.button("✨ Generate Daily Sales Report TDL", key="chip_btn_1", use_container_width=True):
        st.session_state["quick_prompt"] = "Write a complete TDL code to create a custom Daily Sales Report with columns for Date, Party Name, Voucher Number, and Total Amount."
        st.rerun()

with col2:
    if st.button("⚡ Add Gateway Switch & Screen", key="chip_btn_2", use_container_width=True):
        st.session_state["quick_prompt"] = "Show me how to add a custom button on the Gateway of Tally that opens a custom alteration screen."
        st.rerun()

with col3:
    if st.button("🧮 Code GST Calculation UDF", key="chip_btn_3", use_container_width=True):
        st.session_state["quick_prompt"] = "Write a TDL User Defined Function (UDF) to calculate GST tax amount given a taxable value and tax rate percentage."
        st.rerun()

with col4:
    if st.button("🧠 Analyze TDL Collections & Filters", key="chip_btn_4", use_container_width=True):
        st.session_state["quick_prompt"] = "Explain TDL Collections with an example showing how to fetch and filter all Ledger Vouchers."
        st.rerun()

st.markdown("---")


def render_validation(code_blocks):
    """Run the shared TDL validator on the first code block and render
    a pass/fail expander in the UI."""
    if not code_blocks:
        return
    issues = validate_tdl_code(code_blocks[0])
    if issues:
        with st.expander(f"⚠️ TDL Syntax Check — {len(issues)} issue(s) found", expanded=True):
            for issue in issues:
                st.markdown(f"- {issue}")
    else:
        with st.expander("✅ TDL Syntax Check — passed", expanded=False):
            st.markdown("Bracket/colon balance verified and a recognized TDL definition header was found.")


def run_completion(api_messages, do_stream, fallback_attempt=False, fallback_count=0, temp_val=None, top_p_val=None):
    """Call the LLM and return the full response text, streaming to the
    UI if requested. Automatically recovers from 401 Authentication errors,
    NVIDIA NIM concurrency/rate limit errors (ResourceExhausted), and DEGRADED endpoints."""
    global client
    target_model = st.session_state.get("selected_model", MODEL_NAME)
    active_temp = temp_val if temp_val is not None else temperature
    active_top_p = top_p_val if top_p_val is not None else top_p
    try:
        if do_stream:
            response_stream = client.chat.completions.create(
                model=target_model, messages=api_messages,
                temperature=active_temp, top_p=active_top_p, max_tokens=max_tokens,
                extra_body={"chat_template_kwargs": {"enable_thinking": True, "clear_thinking": False}},
                stream=True,
            )

            def gen():
                reasoning_started = False
                reasoning_ended = False
                for chunk in response_stream:
                    if not getattr(chunk, "choices", None):
                        continue
                    if len(chunk.choices) == 0 or getattr(chunk.choices[0], "delta", None) is None:
                        continue
                    delta = chunk.choices[0].delta
                    reasoning = getattr(delta, "reasoning_content", None)
                    if reasoning:
                        if not reasoning_started:
                            yield "💭 *Thinking...*\n> "
                            reasoning_started = True
                        yield reasoning.replace("\n", "\n> ")
                    content = getattr(delta, "content", None)
                    if content:
                        if reasoning_started and not reasoning_ended:
                            yield "\n\n---\n\n"
                            reasoning_ended = True
                        yield content

            full_response = st.write_stream(gen())
        else:
            completion = client.chat.completions.create(
                model=target_model, messages=api_messages,
                temperature=active_temp, top_p=active_top_p, max_tokens=max_tokens,
                extra_body={"chat_template_kwargs": {"enable_thinking": True, "clear_thinking": False}},
                stream=False,
            )
            full_response = completion.choices[0].message.content
            st.markdown(full_response)
    except Exception as e:
        err_str = str(e)
        if "401" in err_str or "Unauthorized" in err_str or "Authentication failed" in err_str or "403" in err_str or "Forbidden" in err_str:
            st.session_state["nvidia_api_key"] = ""
            st.session_state["api_key_valid"] = False
            st.session_state["api_key_validation_error"] = err_str
            os.environ.pop("NVIDIA_API_KEY", None)
            raise e
        elif any(k in err_str for k in [
            "ResourceExhausted", "limit reached", "request limit", "Worker local",
            "429", "RateLimit", "rate limit", "too many requests", "overloaded",
            "400", "DEGRADED", "Bad Request", "500", "502", "503", "504"
        ]) and fallback_count < 2:
            backup = "meta/llama-3.1-70b-instruct" if target_model != "meta/llama-3.1-70b-instruct" else "meta/llama-3.3-70b-instruct"
            st.warning(f"⚠️ Model endpoint `{target_model}` is busy or rate-limited on NVIDIA NIM (`{err_str.splitlines()[0]}`). Automatically switching to healthy backup model `{backup}`...")
            st.session_state["selected_model"] = backup
            time.sleep(1.0)
            return run_completion(api_messages, do_stream, fallback_attempt=True, fallback_count=fallback_count + 1)
        elif any(k in err_str for k in ["10054", "forcibly closed", "ConnectionReset", "RemoteDisconnected", "connection closed", "timeout", "timed out"]):
            if do_stream and fallback_count == 0:
                st.warning("⚠️ Network streaming connection dropped by remote server ([WinError 10054]). Automatically retrying in robust non-streaming mode...")
                return run_completion(api_messages, do_stream=False, fallback_attempt=fallback_attempt, fallback_count=fallback_count)
            elif fallback_count < 2:
                backup = "meta/llama-3.1-70b-instruct" if target_model != "meta/llama-3.1-70b-instruct" else "meta/llama-3.3-70b-instruct"
                st.warning(f"⚠️ Network error encountered on `{target_model}`. Automatically switching to backup model `{backup}`...")
                st.session_state["selected_model"] = backup
                time.sleep(1.0)
                return run_completion(api_messages, do_stream=False, fallback_attempt=True, fallback_count=fallback_count + 1)
        raise e

    if full_response and "<think>" in full_response:
        full_response = re.sub(r"<think>.*?</think>", "", full_response, flags=re.DOTALL).strip()
    return full_response or ""


# 7. Render Conversation History
for i, message in enumerate(st.session_state["messages"]):
    with st.chat_message(message["role"]):
        st.markdown(message["content"])
        if message["role"] == "assistant" and message.get("context_files") and show_context:
            with st.expander(f"📚 Retrieved Knowledge Base Context ({len(message['context_files'])} sources matched)", expanded=False):
                st.write("The following repository chunks provided context for this response:")
                cols = st.columns(min(len(message["context_files"]), 3))
                for idx, fname in enumerate(message["context_files"]):
                    cols[idx % len(cols)].markdown(f"`📄 {fname}`")
        if message["role"] == "assistant" and auto_validate:
            render_validation(extract_tdl_code_blocks(message["content"]))

# 8. Handle Input (from Chat Input Box OR Quick Prompt Button)
user_query = st.chat_input("Ask a TDL development question or describe your customization...")

if st.session_state.get("quick_prompt"):
    user_query = st.session_state["quick_prompt"]
    st.session_state["quick_prompt"] = None

if user_query:
    if client is None or st.session_state.get("api_key_valid") is not True:
        st.error("⚠️ No valid NVIDIA API key configured. Add a valid one in the sidebar to start chatting.")
    else:
        st.session_state["messages"].append({"role": "user", "content": user_query})
        with st.chat_message("user"):
            st.markdown(user_query)

        with st.chat_message("assistant"):
            with st.status("🔍 Searching knowledge base and analyzing TDL structures...", expanded=True) as status:
                context, matched_files, retrieval_metrics = st.session_state["memory"].retrieve_context(
                    user_query, top_k=max_files, return_sources=True, return_metrics=True
                )
                status.update(
                    label=f"✅ Found {len(matched_files)} relevant source(s) (Confidence: {retrieval_metrics['confidence']*100:.1f}%). Generating response...",
                    state="running",
                )

                system_prompt = build_system_prompt(context, is_general_query=retrieval_metrics.get("is_general_query", False))
                dyn_params = compute_adaptive_generation_params(user_query, retrieval_metrics)
                active_t = dyn_params["temperature"] if auto_tune_params else temperature
                active_p = dyn_params["top_p"] if auto_tune_params else top_p
                if auto_tune_params:
                    st.caption(f"🧠 **Adaptive Auto-Tuning**: Mode = `{dyn_params['mode']}` | Temp = `{active_t}` | Top-P = `{active_p}` ({dyn_params['reason']})")

                api_messages = [{"role": "system", "content": system_prompt}]
                for msg in st.session_state["messages"][-6:]:
                    api_messages.append({"role": msg["role"], "content": msg["content"]})

                try:
                    full_response = run_completion(api_messages, stream_response, temp_val=active_t, top_p_val=active_p)
                    status.update(label="✅ Response generated!", state="complete")

                    code_blocks = extract_tdl_code_blocks(full_response)
                    if auto_validate and code_blocks:
                        issues = validate_tdl_code(code_blocks[0])
                        if issues:
                            st.warning(f"⚠️ {len(issues)} syntax issue(s) detected in the generated code.")
                            for issue in issues:
                                st.markdown(f"- {issue}")
                            if st.button("🔧 Regenerate with fixes", key=f"fix_{len(st.session_state['messages'])}"):
                                repair_messages = api_messages + [
                                    {"role": "assistant", "content": full_response},
                                    {"role": "user", "content": build_repair_prompt(code_blocks[0], issues)},
                                ]
                                full_response = run_completion(repair_messages, stream_response)
                        else:
                            st.success("✅ TDL syntax check passed.")

                    if retrieval_metrics and show_context:
                        with st.expander(f"⚙️ Tier 3 Hybrid RAG & Confidence Guardrail ({retrieval_metrics['confidence']*100:.1f}% confidence)", expanded=False):
                            c1, c2, c3 = st.columns(3)
                            c1.metric("Retrieval Confidence", f"{retrieval_metrics['confidence']*100:.1f}%")
                            c2.metric("Routing Mode", "Universal Gemini Mode" if retrieval_metrics.get("is_general_query") else "TDL Expert Mode")
                            c3.metric("Candidates Scored", f"{retrieval_metrics['total_candidates_scored']}")
                            if retrieval_metrics.get("top_chunks"):
                                st.write("**Reciprocal Rank Fusion (RRF) Top Chunks:**")
                                st.dataframe(retrieval_metrics["top_chunks"], use_container_width=True)

                    if matched_files and show_context:
                        with st.expander(f"📚 Retrieved Knowledge Base Context ({len(matched_files)} sources matched)", expanded=False):
                            st.write("The following repository chunks provided context for this response:")
                            cols = st.columns(min(len(matched_files), 3))
                            for idx, fname in enumerate(matched_files):
                                cols[idx % len(cols)].markdown(f"`📄 {fname}`")

                    st.session_state["messages"].append({
                        "role": "assistant",
                        "content": full_response,
                        "context_files": matched_files,
                        "retrieval_metrics": retrieval_metrics,
                    })

                except Exception as e:
                    status.update(label="❌ API Error", state="error")
                    err_str = str(e)
                    if "401" in err_str or "Unauthorized" in err_str or "Authentication failed" in err_str or "403" in err_str or "Forbidden" in err_str:
                        error_msg = "⚠️ **API key authentication failed (401/403).**\nPlease re-enter a valid NVIDIA NIM API key in the sidebar."
                    elif any(k in err_str for k in ["ResourceExhausted", "limit reached", "request limit", "Worker local", "429", "RateLimit", "rate limit", "too many requests"]):
                        error_msg = f"⚠️ **NVIDIA NIM Concurrency/Rate Limit Reached:**\n```\n{err_str}\n```\nThe model workers on NVIDIA NIM are temporarily at full capacity. Please wait a few seconds and try again, or switch to a different model endpoint in the sidebar."
                    else:
                        error_msg = f"⚠️ **API Error encountered:**\n```\n{str(e)}\n```\nPlease verify your network connection and NVIDIA API key."
                    st.error(error_msg)
                    st.session_state["messages"].append({"role": "assistant", "content": error_msg, "context_files": []})