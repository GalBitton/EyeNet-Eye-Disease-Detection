from threading import Thread, Lock
from src.config.settings import CLASSES
from src.utils.inference import predict_from_full_face_image  # ודא שזה מחזיר תוצאה

def analyze_images(image_storage):
    results, threads, lock = [], [], Lock()

    for img in image_storage:
        t = Thread(target=_thread_target, args=(img, results, lock))
        t.start()
        threads.append(t)

    for t in threads:
        t.join()

    # ✅ Aggregate predictions
    left_eye_sums, right_eye_sums = {cls: 0.0 for cls in CLASSES}, {cls: 0.0 for cls in CLASSES}
    left_eye_counts, right_eye_counts = 0, 0

    left_preview , right_preview = None, None
    for r in results:
        leye = r.get("left_eye", {})
        reye = r.get("right_eye", {})

        if leye.get("best_prediction") != "Not Detected":
            if "average_scores" in leye:
                for cls in CLASSES:
                    left_eye_sums[cls] += leye["average_scores"][cls]
                left_eye_counts += 1
            if left_preview is None:
                left_preview = {
                    "image_preview": leye["image_preview"],
                    "grad_cam_preview": leye["grad_cam_preview"]
                }

        if reye.get("best_prediction") != "Not Detected":
            for cls in CLASSES:
                right_eye_sums[cls] += reye["average_scores"][cls]
            right_eye_counts += 1
            if right_preview is None:
                right_preview = {
                    "image_preview": reye["image_preview"],
                    "grad_cam_preview": reye["grad_cam_preview"]
                }

    if left_eye_counts == 0 and right_eye_counts == 0:
        return {"status_code": 400, "body": {"error": "No valid eye images detected"}}

    left_eye_avg = _average_scores(left_eye_sums, left_eye_counts)
    right_eye_avg = _average_scores(right_eye_sums, right_eye_counts)

    # Get best predicted class
    left_best = max(left_eye_avg, key=left_eye_avg.get) if left_eye_counts > 0 else "Not Detected"
    right_best = max(right_eye_avg, key=right_eye_avg.get) if right_eye_counts > 0 else "Not Detected"

    result = {
        "status_code": 200,
        "body": {
            "left_eye": {
                "average_scores": left_eye_avg,
                "best_prediction": left_best,
                "image_preview": left_preview["image_preview"] if left_preview else None,
                "grad_cam_preview": left_preview["grad_cam_preview"] if left_preview else None
            },
            "right_eye": {
                "average_scores": right_eye_avg,
                "best_prediction": right_best,
                "image_preview": right_preview["image_preview"] if right_preview else None,
                "grad_cam_preview": right_preview["grad_cam_preview"] if right_preview else None
            }
        }
    }
    return result

def _thread_target(img,results, lock):
    result = predict_from_full_face_image(img)
    with lock:
        results.append(result)

# Calculate averages
def _average_scores(sums, count):
    return {cls: round(sums[cls] / count, 2) if count > 0 else 0.0 for cls in CLASSES}