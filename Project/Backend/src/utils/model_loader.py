# utils/model_loader.py
from tensorflow.keras.models import load_model
from constants import paths


print("[INFO] Loading EyeNet model...")
model = load_model(paths.MODEL_PATH)
print("[INFO] Model loaded successfully.")
