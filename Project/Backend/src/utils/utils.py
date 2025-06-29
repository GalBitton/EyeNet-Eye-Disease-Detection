import json
import base64
import os
import uuid
import threading
import numpy as np
import cv2
from .detection import detect_face_and_eyes
from .model_loader import model

TEMP_DIR = "./temp_images"
SAVED_EYES_DIR = "./saved_eyes"
os.makedirs(SAVED_EYES_DIR, exist_ok=True)

os.makedirs(TEMP_DIR, exist_ok=True)

PREDICTIONS = []
class_names= ["Cataract", "Healthy", "Conjunctivitis", "Stye"]

def base64_to_image(base64_string):
    if "," in base64_string:
        base64_string = base64_string.split(",")[1]
    image_data = base64.b64decode(base64_string)
    nparr = np.frombuffer(image_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    temp_path = os.path.join(TEMP_DIR, f"{uuid.uuid4().hex}.png")
    cv2.imwrite(temp_path, img)
    return temp_path

def preprocess_eye(eye_img):
    resized = cv2.resize(eye_img, (224, 224))
    normalized = resized / 255.0
    return normalized

def predict_from_eyes(left_eye, right_eye):
    results = {}

    if left_eye is not None:
        left = preprocess_eye(left_eye)
        input_tensor = np.expand_dims(left, axis=0)
        prediction = model.predict(input_tensor)[0]
        left_result = {class_names[i]: float(prediction[i] * 100) for i in range(len(class_names))}
        results["left_eye"] = left_result
    else:
        results["left_eye"] = {"error": "Left eye not detected"}

    if right_eye is not None:
        right = preprocess_eye(right_eye)
        input_tensor = np.expand_dims(right, axis=0)
        prediction = model.predict(input_tensor)[0]
        right_result = {class_names[i]: float(prediction[i] * 100) for i in range(len(class_names))}
        results["right_eye"] = right_result
    else:
        results["right_eye"] = {"error": "Right eye not detected"}

    return results


def process_image(image_dict):
    image_path = base64_to_image(image_dict["image"])
    left_eye, right_eye = detect_face_and_eyes(image_path)

    # שמירת העיניים אם זוהו
    if left_eye is not None:
        left_eye_path = os.path.join(SAVED_EYES_DIR, f"left_{uuid.uuid4().hex}.png")
        cv2.imwrite(left_eye_path, left_eye)

    if right_eye is not None:
        right_eye_path = os.path.join(SAVED_EYES_DIR, f"right_{uuid.uuid4().hex}.png")
        cv2.imwrite(right_eye_path, right_eye)

    result = predict_from_eyes(left_eye, right_eye)
    result["original_score"] = image_dict["score"]
    result["blur"] = image_dict["blur"]
    PREDICTIONS.append(result)
    os.remove(image_path)

    return result
