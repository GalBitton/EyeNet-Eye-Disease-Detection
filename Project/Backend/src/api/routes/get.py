#test
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse

router = APIRouter()

# Health check endpoint
@router.get("/health")
async def health_check():
    """
    Health check endpoint to verify if the server is running.
    """
    return JSONResponse(content={"status": "ok"}, status_code=200)
