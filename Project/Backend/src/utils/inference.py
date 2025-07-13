import cv2
import tensorflow as tf
import numpy as np
import base64
from src.config.settings import GRAD_CAM_LAYER,CLASSES,SAVED_EYES_DIR
import os
import uuid
from .detection import detect_face_and_eyes
from .image_io import base64_to_image
from .model_loader import get_model
from .logger import logger


def preprocess_eye(eye_img):
    resized = cv2.resize(eye_img, (224, 224))
    normalized = resized / 255.0
    return normalized

def generate_gradcam_base64(model, img_array, predicted_class, last_conv_layer_name=GRAD_CAM_LAYER):
    """
    Generate Grad-CAM heatmap for the given input image and class,
    return it as a base64-encoded PNG image string.
    """
    # Build intermediate model to get conv layer output + predictions
    logger.info(f"Generating Grad-CAM for class: {CLASSES[predicted_class]}")
    grad_model = tf.keras.models.Model(
        [model.inputs],
        [model.get_layer(last_conv_layer_name).output, model.output]
    )

    # Forward pass + gradient tape
    with tf.GradientTape() as tape:
        conv_outputs, predictions = grad_model(img_array)
        loss = predictions[:, predicted_class]

    # Gradients of the predicted class w.r.t conv outputs
    grads = tape.gradient(loss, conv_outputs)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    conv_outputs = conv_outputs[0]

    # Weighted sum of channels
    heatmap = tf.reduce_sum(tf.multiply(pooled_grads, conv_outputs), axis=-1)

    # Normalize heatmap
    heatmap = np.maximum(heatmap, 0) / tf.math.reduce_max(heatmap)
    heatmap = heatmap.numpy()

    # Resize heatmap
    heatmap = cv2.resize(heatmap, (224, 224))
    heatmap = np.uint8(255 * heatmap)
    heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)

    # Encode as base64 PNG
    _, buffer = cv2.imencode('.png', heatmap)
    gradcam_base64 = "data:image/png;base64," + base64.b64encode(buffer).decode()

    return gradcam_base64

def predict_from_uploaded_image(image_b64):
    model = get_model()
    # decode base64
    image_data = base64.b64decode(image_b64.split(",")[1])
    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if image is None:
        return {
            "left_eye": {"best_prediction": "Not Detected"},
            "right_eye": {"best_prediction": "Not Detected"}
        }

    processed_image = preprocess_eye(image)
    input_tensor = np.expand_dims(processed_image, axis=0)
    prediction = model.predict(input_tensor)[0]
    best_pred_idx = np.argmax(prediction)
    best_pred_class = CLASSES[best_pred_idx]
    scores = {CLASSES[i]: float(prediction[i] * 100) for i in range(len(CLASSES))}
    # encode original image preview
    _, buffer = cv2.imencode('.png', image)
    image_preview = "data:image/png;base64," + base64.b64encode(buffer).decode()

    # generate grad-cam
    grad_cam_preview = generate_gradcam_base64(model, input_tensor, best_pred_idx)
    return {
        "left_eye": {
            "average_scores": scores,
            "best_prediction": best_pred_class,
            "image_preview": image_preview,
            "grad_cam_preview": grad_cam_preview
        },
        "right_eye": {
            "best_prediction": "Not Detected"
        }
    }

def predict_from_full_face_image(image_dict):
    model = get_model()

    image_path = base64_to_image(image_dict["image"])
    left_eye, right_eye = detect_face_and_eyes(image_path)

    if left_eye is None and right_eye is None:
        return {"error": "No face detected in the image"}

    result = {
        "left_eye": predict_for_single_eye_image(left_eye,"left_eye"),
        "right_eye": predict_for_single_eye_image(right_eye,"right_eye")
    }
    return result

def predict_for_eyes_images(left_eye, right_eye):
    results = {}
    predict_for_single_eye_image(left_eye,"left_eye", results)
    predict_for_single_eye_image(right_eye,"right_eye", results)
    return results

def predict_for_single_eye_image(eye_img, side):
    if eye_img is None:
        logger.warning(f"No {side} eye image provided for prediction.")
        return {
            "best_prediction": "Not Detected"
        }

    # Save cropped eye to disk
    eye_path = os.path.join(SAVED_EYES_DIR, f"{side}_{uuid.uuid4().hex}.png")
    cv2.imwrite(eye_path, eye_img)

    # Preprocess and predict
    processed = preprocess_eye(eye_img)
    input_tensor = np.expand_dims(processed, axis=0)
    prediction = model.predict(input_tensor)[0]
    best_pred_idx = np.argmax(prediction)
    best_pred_class = CLASSES[best_pred_idx]

    # Scores
    scores = {CLASSES[i]: float(prediction[i] * 100) for i in range(len(CLASSES))}

    # Previews
    _, buffer = cv2.imencode('.png', eye_img)
    image_preview = "data:image/png;base64," + base64.b64encode(buffer).decode()

    grad_cam_preview = generate_gradcam_base64(model, input_tensor, best_pred_idx)

    # Delete the saved eye image after processing
    os.remove(eye_path)
    return {
        "average_scores": scores,
        "best_prediction": best_pred_class,
        "image_preview": image_preview,
        "grad_cam_preview": grad_cam_preview
    }