import uuid
import time
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.models import ChatSession, ChatMessage, PermanentRule
from app.core.schemas import (
    ChatMessageCreate,
    ChatMessageResponse,
    SessionCreate,
    SessionResponse,
)
from app.engine.rag_engine import RagEngine
from app.engine.ast_validator import full_validate_and_refine

router = APIRouter(prefix="/chat", tags=["Chat"])
rag_engine = RagEngine()


@router.get("/sessions", response_model=List[SessionResponse])
def get_sessions(db: Session = Depends(get_db)):
    return db.query(ChatSession).order_by(ChatSession.updated_at.desc()).all()


@router.post("/sessions", response_model=SessionResponse)
def create_session(session_in: SessionCreate, db: Session = Depends(get_db)):
    session_id = str(uuid.uuid4())
    db_session = ChatSession(
        id=session_id,
        title=session_in.title or "New TDL Workspace Session",
        model_name=session_in.model_name or "z-ai/glm-5.2"
    )
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session


@router.delete("/sessions/{session_id}")
def delete_session(session_id: str, db: Session = Depends(get_db)):
    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    db.delete(session)
    db.commit()
    return {"message": "Session deleted"}


@router.get("/sessions/{session_id}/messages", response_model=List[ChatMessageResponse])
def get_session_messages(session_id: str, db: Session = Depends(get_db)):
    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return db.query(ChatMessage).filter(ChatMessage.session_id == session_id).order_by(ChatMessage.created_at.asc()).all()


@router.post("/messages", response_model=ChatMessageResponse)
def send_message(msg_in: ChatMessageCreate, db: Session = Depends(get_db)):
    session = db.query(ChatSession).filter(ChatSession.id == msg_in.session_id).first()
    if not session:
        session = ChatSession(
            id=msg_in.session_id,
            title=msg_in.message[:35] + "...",
            model_name=msg_in.model_name or "z-ai/glm-5.2"
        )
        db.add(session)
        db.commit()

    # Save user message
    user_msg = ChatMessage(
        session_id=msg_in.session_id,
        role="user",
        content=msg_in.message,
    )
    db.add(user_msg)

    # Fetch permanent rules
    rules = [r.rule_text for r in db.query(PermanentRule).all()]

    # Generate response via RAG engine with fallback recovery
    target_model = msg_in.model_name or "z-ai/glm-5.2"
    try:
        rag_result = rag_engine.generate_response(
            query=msg_in.message,
            rules=rules,
            model_name=target_model,
            api_key=msg_in.api_key
        )
    except Exception as err_primary:
        err_str = str(err_primary)
        print(f"[RAG Engine Warning] Model {target_model} failed: {err_str}. Retrying with fallback model meta/llama-3.1-70b-instruct...")
        try:
            rag_result = rag_engine.generate_response(
                query=msg_in.message,
                rules=rules,
                model_name="meta/llama-3.1-70b-instruct",
                api_key=msg_in.api_key
            )
        except Exception as err_fallback:
            print(f"[RAG Engine Error] Fallback failed: {err_fallback}")
            rag_result = {
                "content": f"⚠️ **AI Service Notice**: Unable to generate response from model `{target_model}`. Please check your NVIDIA API Key or select another model in the top-right menu.\n\n*Error details: {err_str}*",
                "tdl_code": "",
                "confidence": 0.0,
                "context_count": 0
            }

    tdl_code = rag_result.get("tdl_code", "")
    val_status = "PASS"
    if tdl_code:
        val_res = full_validate_and_refine(tdl_code)
        val_status = val_res["status"]
        tdl_code = val_res["clean_code"]

    assistant_msg = ChatMessage(
        session_id=msg_in.session_id,
        role="assistant",
        content=rag_result["content"],
        tdl_code=tdl_code,
        confidence_score=rag_result.get("confidence", 0.0),
        validation_status=val_status,
    )
    db.add(assistant_msg)

    if session.title == "New TDL Workspace Session" or not session.title:
        session.title = msg_in.message[:35] + "..."
    
    db.commit()
    db.refresh(assistant_msg)

    return assistant_msg
