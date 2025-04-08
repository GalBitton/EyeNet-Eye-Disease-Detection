from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import logging
import os
import cv2
import tensorflow as tf
from utils.detection import detect_face_and_eyes

# Initialize FastAPI
app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Middleware for CORS (enables React frontend to interact with FastAPI backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory to store temporary files
temp_dir = "./temp"
os.makedirs(temp_dir, exist_ok=True)

# Serve files from the temp directory
app.mount("/temp", StaticFiles(directory=temp_dir), name="temp")

# Model Path
MODEL_PATH = r"C:\Users\User\Desktop\FinalProject\New Models\improved_eye_cataract_model_with_attention.h5"

# Model loading with logging
model = None


@app.on_event("startup")
async def load_model():
    global model
    logger.debug("Loading model...")
    try:
        model = tf.keras.models.load_model(MODEL_PATH)
        logger.info(f"Model loaded successfully from {MODEL_PATH}")
    except Exception as e:
        logger.error(f"Error loading the model: {e}")
        raise RuntimeError(f"Error loading the model: {e}")


def clear_temp_files():
    """
    Delete all files in the temporary directory.
    """
    logger.debug("Clearing temporary files...")
    for file in os.listdir(temp_dir):
        try:
            file_path = os.path.join(temp_dir, file)
            os.remove(file_path)
            logger.info(f"Deleted temporary file: {file_path}")
        except Exception as e:
            logger.error(f"Error deleting file {file}: {e}")


def preprocess_eye_image(image_path):
    """
    Preprocess the eye image for the model.
    Resize to (224, 224), normalize, and add batch dimension.
    """
    try:
        logger.debug(f"Preprocessing image: {image_path}")
        image = tf.keras.utils.load_img(image_path, target_size=(224, 224))
        image_array = tf.keras.utils.img_to_array(image)
        image_array = image_array / 255.0  # Normalize pixel values to [0, 1]
        image_array = tf.expand_dims(image_array, axis=0)  # Add batch dimension
        return image_array
    except Exception as e:
        logger.error(f"Error preprocessing the image: {e}")
        raise ValueError(f"Error preprocessing the image: {e}")


def predict_eye_status(image_path):
    """
    Predict the health status of an eye using the model.
    Returns the predicted class and confidence scores.
    """
    logger.debug(f"Predicting eye status for: {image_path}")
    preprocessed_image = preprocess_eye_image(image_path)
    prediction = model.predict(preprocessed_image)[0][0]
    healthy_confidence = prediction * 100
    cataract_confidence = (1 - prediction) * 100
    predicted_class = "Cataract" if prediction < 0.5 else "Healthy"

    logger.info(
        f"Prediction result: {predicted_class}, Healthy: {healthy_confidence}%, Cataract: {cataract_confidence}%"
    )
    return {
        "status": predicted_class,
        "healthy_confidence": round(healthy_confidence, 2),
        "cataract_confidence": round(cataract_confidence, 2),
    }


@app.post("/upload")
async def process_image(file: UploadFile = File(...)):
    """
    Endpoint to handle image uploads, process the image, and return predictions.
    """
    logger.debug("Received upload request")

    # Clear old temporary files
    clear_temp_files()

    if not file.content_type.startswith("image/"):
        logger.error("Uploaded file is not an image.")
        raise HTTPException(status_code=400, detail="Uploaded file is not an image.")

    # Save the uploaded file temporarily
    temp_file_path = os.path.join(temp_dir, "uploaded_image.jpg")
    try:
        with open(temp_file_path, "wb") as f:
            f.write(await file.read())
        logger.info(f"Uploaded image saved at: {temp_file_path}")
    except Exception as e:
        logger.error(f"Error saving the uploaded image: {e}")
        raise HTTPException(status_code=500, detail=f"Error saving the uploaded image: {e}")

    # Detect face and eyes in the image
    try:
        left_eye, right_eye = detect_face_and_eyes(temp_file_path)
    except Exception as e:
        logger.error(f"Error detecting face and eyes: {e}")
        raise HTTPException(status_code=500, detail=f"Error detecting face and eyes: {e}")

    if left_eye is None and right_eye is None:
        logger.warning("No face or eyes detected in the image.")
        return JSONResponse(
            content={
                "message": "No face or eyes detected in the image. Please try a different image.",
                "left_eye_result": None,
                "right_eye_result": None,
                "left_eye_image_url": None,
                "right_eye_image_url": None,
            },
            status_code=200,
        )

    # Save cropped eye images temporarily
    left_eye_path, right_eye_path = None, None
    try:
        if left_eye is not None:
            left_eye_path = os.path.join(temp_dir, "left_eye.jpg")
            cv2.imwrite(left_eye_path, left_eye)
            logger.info(f"Left eye saved at: {left_eye_path}")

        if right_eye is not None:
            right_eye_path = os.path.join(temp_dir, "right_eye.jpg")
            cv2.imwrite(right_eye_path, right_eye)
            logger.info(f"Right eye saved at: {right_eye_path}")
    except Exception as e:
        logger.error(f"Error saving cropped eye images: {e}")
        raise HTTPException(status_code=500, detail=f"Error saving cropped eye images: {e}")

    # Predict health status for each eye
    try:
        left_eye_result = (
            predict_eye_status(left_eye_path) if left_eye_path else {"status": "Not Detected"}
        )
        right_eye_result = (
            predict_eye_status(right_eye_path) if right_eye_path else {"status": "Not Detected"}
        )
    except Exception as e:
        logger.error(f"Error during prediction: {e}")
        raise HTTPException(status_code=500, detail=f"Error during prediction: {e}")

    # Construct URLs for the eye images
    left_eye_url = f"/temp/left_eye.jpg" if left_eye_path else None
    right_eye_url = f"/temp/right_eye.jpg" if right_eye_path else None

    # Return the results as a JSON response
    logger.info("Image processed successfully.")
    return JSONResponse(
        content={
            "message": "Image processed successfully.",
            "left_eye_result": left_eye_result,
            "right_eye_result": right_eye_result,
            "left_eye_image_url": left_eye_url,
            "right_eye_image_url": right_eye_url,
        },
        status_code=200,
    )
