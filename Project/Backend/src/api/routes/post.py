# post.py
from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from src.services.video_handler import assemble_video_from_chunks
router = APIRouter()

@router.post("/upload")
async def upload_chunk(file: UploadFile = File(...)):
    # Placeholder logic
    print("Received file:", file.filename)
    return JSONResponse(content={"status": "received"})

@router.post("/finish_session")
def finish_session(session_id: str):
    result = assemble_video_from_chunks(session_id)
    if "error" in result:
        return JSONResponse(content=result, status_code=404)
    return JSONResponse(content=result)