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

        left_eye_counts, left_preview = _calculate_scores_and_counts(leye, left_eye_sums, left_eye_counts, left_preview)

        right_eye_counts, right_preview = _calculate_scores_and_counts(reye, right_eye_sums, right_eye_counts, right_preview)

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
                "image_preview": (left_preview or {}).get("image_preview"),
                "grad_cam_preview": (left_preview or {}).get("grad_cam_preview")
            },
            "right_eye": {
                "average_scores": right_eye_avg,
                "best_prediction": right_best,
                "image_preview": (right_preview or {}).get("image_preview"),
                "grad_cam_preview": (right_preview or {}).get("grad_cam_preview")
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

def _calculate_scores_and_counts(eye, eye_sums, eye_counts, preview):
    if eye.get("best_prediction") != "Not Detected" and "average_scores" in eye:
        for cls in CLASSES:
            eye_sums[cls] += eye["average_scores"][cls]
        eye_counts += 1
        if preview is None:
            preview = {
                "image_preview": eye["image_preview"],
                "grad_cam_preview": eye["grad_cam_preview"]
            }
    return eye_counts, preview