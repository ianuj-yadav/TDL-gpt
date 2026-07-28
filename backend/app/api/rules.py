from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.models import PermanentRule
from app.core.schemas import RuleCreate, RuleResponse

router = APIRouter(prefix="/rules", tags=["Permanent Teaching Memory"])


@router.get("", response_model=List[RuleResponse])
def list_rules(db: Session = Depends(get_db)):
    return db.query(PermanentRule).order_by(PermanentRule.created_at.desc()).all()


@router.post("", response_model=RuleResponse)
def create_rule(rule_in: RuleCreate, db: Session = Depends(get_db)):
    rule = PermanentRule(rule_text=rule_in.rule_text, rule_type=rule_in.rule_type)
    db.add(rule)
    db.commit()
    db.refresh(rule)
    return rule


@router.delete("/{rule_id}")
def delete_rule(rule_id: int, db: Session = Depends(get_db)):
    rule = db.query(PermanentRule).filter(PermanentRule.id == rule_id).first()
    if not rule:
        raise HTTPException(status_code=404, detail="Rule not found")
    db.delete(rule)
    db.commit()
    return {"message": f"Rule {rule_id} deleted"}
