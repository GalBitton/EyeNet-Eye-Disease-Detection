# utils/model_loader.py
from tensorflow.keras.models import load_model
from src.constants import paths
import tensorflow_addons as tfa  # this is critical to load Addons>AdamW


custom_objects = {
    'Addons>AdamW': tfa.optimizers.AdamW,
}

print("[INFO] Loading EyeNet model...")
model = load_model(paths.MODEL_PATH, custom_objects=custom_objects)
print("[INFO] Model loaded successfully.")
