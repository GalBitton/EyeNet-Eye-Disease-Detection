from robyn import SubRouter
import json
import threading
import os
from threading import Lock
from utils.utils import process_image  # ודא שזה מחזיר תוצאה


router = SubRouter(__file__)

# נתיב זמני לתמונות
TEMP_DIR = "./temp_images"
os.makedirs(TEMP_DIR, exist_ok=True)

@router.post("/analyze")
async def analyze(request):
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

    results = []
    results_lock = Lock()
    threads = []

    def thread_target(img):
        result = process_image(img)
        with results_lock:
            results.append(result)

    for img in image_storage:
        t = threading.Thread(target=thread_target, args=(img,))
        t.start()
        threads.append(t)

    for t in threads:
        t.join()

    return {
        "status code": 200,
        "Content-Type": "application/json",
        "body": json.dumps(results)
    }



