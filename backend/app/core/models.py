from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(String(36), primary_key=True, index=True)
    title = Column(String(255), nullable=False, default="New TDL Workspace Session")
    model_name = Column(String(100), default="z-ai/glm-5.2")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    messages = relationship("ChatMessage", back_populates="session", cascade="all, delete-orphan")


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    session_id = Column(String(36), ForeignKey("chat_sessions.id", ondelete="CASCADE"), nullable=False)
    role = Column(String(20), nullable=False)  # 'user', 'assistant', 'system'
    content = Column(Text, nullable=False)
    tdl_code = Column(Text, nullable=True)
    confidence_score = Column(Float, nullable=True)
    validation_status = Column(String(50), nullable=True)  # 'PASS', 'WARNING', 'FAIL'
    created_at = Column(DateTime, default=datetime.utcnow)

    session = relationship("ChatSession", back_populates="messages")


class PermanentRule(Base):
    __tablename__ = "permanent_rules"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    rule_text = Column(Text, nullable=False)
    rule_type = Column(String(50), default="CUSTOM")  # 'SYNTAX', 'BEHAVIOR', 'CUSTOM'
    created_at = Column(DateTime, default=datetime.utcnow)


class KbFile(Base):
    __tablename__ = "kb_files"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    filename = Column(String(255), nullable=False, unique=True)
    file_type = Column(String(50), nullable=False)
    total_chunks = Column(Integer, default=0)
    indexed_at = Column(DateTime, default=datetime.utcnow)
