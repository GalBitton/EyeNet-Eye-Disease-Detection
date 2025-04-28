import sys
import cv2
import numpy as np
import tensorflow as tf
import json
from detection import detect_face_and_eyes
import os

def make_absolute_path(path):
    if not os.path.isabs(path):
        base_dir = os.path.dirname(os.path.abspath(__file__))  # src/python_worker/
        return os.path.abspath(os.path.join(base_dir, '..', path))
    return path

def preprocess_eye(eye_img):
    eye_img = cv2.resize(eye_img, (224, 224))
    eye_img = eye_img / 255.0
    return np.expand_dims(eye_img, axis=0)


def handle_frame(frame_path, haarcascade_face_path, haarcascade_eye_path, shape_predictor_path, model):
    left_eye, right_eye = detect_face_and_eyes(frame_path)

    if left_eye is None or right_eye is None:
        return [-1, -1, -1, -1]

    left_input = preprocess_eye(left_eye)
    right_input = preprocess_eye(right_eye)

    left_pred = model.predict(left_input)
    right_pred = model.predict(right_input)

    avg_prediction = (left_pred + right_pred) / 2.0
    return avg_prediction.tolist()[0]

if __name__ == "__main__":
    model_path = make_absolute_path(sys.argv[1])
    haarcascade_face_path = make_absolute_path(sys.argv[2])
    haarcascade_eye_path = make_absolute_path(sys.argv[3])
    shape_predictor_path = make_absolute_path(sys.argv[4])

    print("Model path:", model_path)
    model = tf.keras.models.load_model(model_path)

    while True:
        line = sys.stdin.readline()
        if not line:
            break

        params = line.strip().split(',')
        frame_path = make_absolute_path(params[0])

        result = handle_frame(frame_path, haarcascade_face_path, haarcascade_eye_path, shape_predictor_path, model)
        print(json.dumps(result))
        sys.stdout.flush()