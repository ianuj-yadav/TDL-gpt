from fastapi import APIRouter
from app.core.schemas import ValidateRequest, ValidateResponse
from app.engine.ast_validator import full_validate_and_refine

router = APIRouter(prefix="/validate", tags=["AST Code Validator"])


@router.post("", response_model=ValidateResponse)
def validate_tdl_code(req: ValidateRequest):
    result = full_validate_and_refine(req.code)
    return ValidateResponse(
        valid=result["valid"],
        status=result["status"],
        hierarchy_errors=result["hierarchy_errors"],
        dangling_references=result["dangling_references"],
        warnings=result["warnings"],
        clean_code=result["clean_code"],
    )
