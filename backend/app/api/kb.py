import os
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.models import KbFile
from app.core.config import settings
from app.engine.kb_builder import build_kb_index, read_bytes_content

router = APIRouter(prefix="/kb", tags=["Knowledge Base"])


@router.get("/status")
def get_kb_status(db: Session = Depends(get_db)):
    indexed_files = db.query(KbFile).all()
    source_dir = settings.SOURCE_FILES_DIR
    local_files = os.listdir(source_dir) if os.path.exists(source_dir) else []
    return {
        "indexed_count": len(indexed_files),
        "source_folder_files": len(local_files),
        "indexed_files": [
            {
                "id": f.id,
                "filename": f.filename,
                "file_type": f.file_type,
                "total_chunks": f.total_chunks,
                "indexed_at": f.indexed_at,
            }
            for f in indexed_files
        ],
    }


@router.post("/rebuild")
def rebuild_kb_index(db: Session = Depends(get_db)):
    source_dir = settings.SOURCE_FILES_DIR
    res = build_kb_index(source_dir=source_dir)

    # Sync with DB
    db.query(KbFile).delete()
    for f in res["files"]:
        ext = os.path.splitext(f["filename"])[1].upper() or "TDL"
        db_file = KbFile(
            filename=f["filename"],
            file_type=ext,
            total_chunks=f["chunks"]
        )
        db.add(db_file)
    db.commit()

    return {
        "status": "SUCCESS",
        "message": f"Successfully indexed {res['total_files']} files with {res['total_chunks']} vector chunks.",
        "details": res,
    }


@router.post("/upload")
async def upload_source_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    source_dir = settings.SOURCE_FILES_DIR
    if not os.path.exists(source_dir):
        os.makedirs(source_dir, exist_ok=True)

    file_path = os.path.join(source_dir, file.filename)
    content = await file.read()
    with open(file_path, "wb") as f:
        f.write(content)

    ext = os.path.splitext(file.filename)[1].upper() or "TDL"
    db_file = KbFile(filename=file.filename, file_type=ext, total_chunks=1)
    db.add(db_file)
    db.commit()

    return {"message": f"File '{file.filename}' uploaded successfully to source repository."}
