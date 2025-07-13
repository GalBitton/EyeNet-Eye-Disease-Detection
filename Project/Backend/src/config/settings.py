import os
from dotenv import load_dotenv

load_dotenv()

MODEL_NAME= os.getenv("MODEL_NAME", "EyeNet")
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
TEMP_IMAGES_DIR = os.getenv("TEMP_IMAGES_DIR", os.path.join(BASE_DIR, "..", "temp_images"))
SAVED_EYES_DIR = os.getenv("SAVED_EYES_DIR", os.path.join(BASE_DIR, "..", "saved_eyes"))
MODEL_PATH = os.getenv("MODEL_PATH", os.path.join(BASE_DIR, "assets", "models", "eyenet_model_52k_ds.h5"))

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
PORT = os.getenv("PORT", 8000)
CLASSES= os.getenv("CLASSES", "Cataract,Conjunctivitis,Healthy,Stye").split(",")
CROP_PADDING_X = int(os.getenv("CROP_PADDING_X", 20))
CROP_PADDING_Y = int(os.getenv("CROP_PADDING_Y", 40))

GRAD_CAM_LAYER= os.getenv("GRAD_CAM_LAYER", "multiply_1")
os.makedirs(TEMP_IMAGES_DIR, exist_ok=True)
os.makedirs(SAVED_EYES_DIR, exist_ok=True)
