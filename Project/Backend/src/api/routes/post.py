from robyn import SubRouter
import json

router = SubRouter(__file__)

image_storage = []


@router.post("/analyze")
async def analyze(request):
    global image_storage
    body = json.loads(request.body)
    image_storage.clear()

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
    print("hi")
    return {
        "status code": 200,
        "Content-Type": "application/json"
    }
