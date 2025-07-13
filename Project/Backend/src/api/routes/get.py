from robyn import SubRouter
import json

router = SubRouter(__file__)

@router.get("/health")
def health():
    return {
        "status": 200,
        "message": "Healthy"
    }
