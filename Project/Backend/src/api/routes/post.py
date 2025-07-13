from robyn import SubRouter
import json
from src.services.analysis_service import analyze_images
from src.services.upload_service import analyze_uploaded_image
router = SubRouter(__file__)

@router.post("/predict")
async def predict(request):
    body = json.loads(request.body)

    image_storage = []
    for item in body:
        image_data = item["image"]
        if not image_data.startswith("data:image"):
            image_data = "data:image/png;base64," + image_data
        image_storage.append({
            "image": image_data,
            "score": item["score"],
            "blur": item["blur"],
            "box": item.get("box")
        })

    response = analyze_images(image_storage)
    return {
        "status_code": response["status_code"],
        "body": json.dumps(response["body"]),
        "headers": {"Content-Type": "application/json"}
    }


@router.post("/upload")
async def upload(request):
    body = json.loads(request.body)
    response = analyze_uploaded_image(body["image"])
    return {
        "status_code": 200,
        "body": json.dumps(response),
        "headers": {"Content-Type": "application/json"}
    }

