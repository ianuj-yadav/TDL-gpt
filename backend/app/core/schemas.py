from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ChatMessageCreate(BaseModel):
    session_id: str
    message: str
    model_name: Optional[str] = "z-ai/glm-5.2"
    api_key: Optional[str] = None

class ChatMessageResponse(BaseModel):
    id: int
    session_id: str
    role: str
    content: str
    tdl_code: Optional[str] = None
    confidence_score: Optional[float] = None
    validation_status: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class SessionCreate(BaseModel):
    title: Optional[str] = "New TDL Workspace Session"
    model_name: Optional[str] = "z-ai/glm-5.2"

class SessionResponse(BaseModel):
    id: str
    title: str
    model_name: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class RuleCreate(BaseModel):
    rule_text: str
    rule_type: Optional[str] = "CUSTOM"

class RuleResponse(BaseModel):
    id: int
    rule_text: str
    rule_type: str
    created_at: datetime

    class Config:
        from_attributes = True

class ValidateRequest(BaseModel):
    code: str

class ValidateResponse(BaseModel):
    valid: bool
    status: str
    hierarchy_errors: List[str]
    dangling_references: List[str]
    warnings: List[str]
    clean_code: str

class KbStatusResponse(BaseModel):
    total_files: int
    total_chunks: int
    dense_vector_dim: int
    indexed_files: List[dict]
