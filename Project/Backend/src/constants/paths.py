## src/constants/paths.py
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploaded_chunks")
FINAL_VIDEOS_FOLDER = os.path.join(BASE_DIR, "final_videos")
MODEL_PATH = os.path.join(BASE_DIR, "assets", "EyeNet_Final_Model.h5")

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(FINAL_VIDEOS_FOLDER, exist_ok=True)