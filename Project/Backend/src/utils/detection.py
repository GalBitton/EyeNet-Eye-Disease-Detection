import cv2
import dlib
import os
from .logger import logger
from .crop import crop_eye_with_eyebrows

# Load Dlib's face detector and shape predictor
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
shape_predictor_path = os.path.join(CURRENT_DIR, "..", "assets", "shape_predictor_68_face_landmarks.dat")

shape_predictor= dlib.shape_predictor(shape_predictor_path)
face_detector = dlib.get_frontal_face_detector()

def detect_face_and_eyes(image_path):
    """
    Detect face and eyes in an image and handle all cases.
    Returns cropped left and right eye images, including eyebrows, if detected.
    """
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Detect faces in the image
    faces = face_detector(gray)

    if len(faces) == 0:
        logger.warning("No face detected. We can't find eyes without a face.")
        return None, None

    # Process the first detected face
    face = faces[0]
    landmarks = shape_predictor(gray, face)

    # Get eye coordinates
    left_eye_coords = [(landmarks.part(i).x, landmarks.part(i).y) for i in range(36, 42)]
    right_eye_coords = [(landmarks.part(i).x, landmarks.part(i).y) for i in range(42, 48)]

    # Extract bounding boxes around eyes including eyebrows
    left_eye = crop_eye_with_eyebrows(image, left_eye_coords)
    right_eye = crop_eye_with_eyebrows(image, right_eye_coords)

    return left_eye, right_eye
