from robyn import SubRouter
import json
import threading
import os
from threading import Lock
from src.utils.utils import process_image  # ודא שזה מחזיר תוצאה


router = SubRouter(__file__)

# נתיב זמני לתמונות
TEMP_DIR = "./temp_images"
class_names= ["Cataract", "Healthy", "Conjunctivitis", "Stye"]
os.makedirs(TEMP_DIR, exist_ok=True)

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

# print image_storage length
    print(f"Number of images to process: {len(image_storage)}")

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

    # ✅ Aggregate predictions
    left_eye_sums = {cls: 0.0 for cls in class_names}
    right_eye_sums = {cls: 0.0 for cls in class_names}
    left_eye_counts = 0
    right_eye_counts = 0

    for r in results:
        if "left_eye" in r and "error" not in r["left_eye"]:
            for cls in class_names:
                left_eye_sums[cls] += r["left_eye"][cls]
            left_eye_counts += 1
        if "right_eye" in r and "error" not in r["right_eye"]:
            for cls in class_names:
                right_eye_sums[cls] += r["right_eye"][cls]
            right_eye_counts += 1

    # Calculate averages
    def average_scores(sums, count):
        return {cls: round(sums[cls] / count, 2) if count > 0 else 0.0 for cls in class_names}

    left_eye_avg = average_scores(left_eye_sums, left_eye_counts)
    right_eye_avg = average_scores(right_eye_sums, right_eye_counts)

    # Get best predicted class
    left_best = max(left_eye_avg, key=left_eye_avg.get) if left_eye_counts > 0 else "Not Detected"
    right_best = max(right_eye_avg, key=right_eye_avg.get) if right_eye_counts > 0 else "Not Detected"

    final_result = {
        "left_eye": {
            "average_scores": left_eye_avg,
            "best_prediction": left_best
        },
        "right_eye": {
            "average_scores": right_eye_avg,
            "best_prediction": right_best
        }
    }

    return {
        "status_code": 200,
        "body": json.dumps(final_result),
        "headers": {
            "Content-Type": "application/json"
        }
    }



