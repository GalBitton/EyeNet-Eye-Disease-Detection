import cv2
import dlib
from utils.crop import crop_eye_with_eyebrows
# Load Dlib's face detector and shape predictor
face_detector = dlib.get_frontal_face_detector()
shape_predictor = dlib.shape_predictor(r"C:\Users\User\Desktop\FinalProject\AnaleyeApplication\utils\shape_predictor_68_face_landmarks.dat")

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
        print("No face detected. Checking for eyes only.")
        # No face detected, try to find eyes directly in the image
        return detect_eyes_only(image)

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


def detect_eyes_only(image):
    """
    Detect eyes in an image without a face using Haar Cascade.
    Returns cropped eye regions, including eyebrows, if detected.
    """
    eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_eye.xml")
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    eyes = eye_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    if len(eyes) == 1:  # Single eye detected
        x, y, w, h = eyes[0]
        left_eye = crop_with_padding(image, x, y, x + w, y + h, padding_x=20, padding_y=40)
        return left_eye, None

    if len(eyes) >= 2:  # Two eyes detected
        # Sort eyes by x-coordinates (left to right)
        eyes = sorted(eyes, key=lambda b: b[0])
        left_eye = crop_with_padding(image, eyes[0][0], eyes[0][1], eyes[0][0] + eyes[0][2], eyes[0][1] + eyes[0][3], padding_x=20, padding_y=40)
        right_eye = crop_with_padding(image, eyes[1][0], eyes[1][1], eyes[1][0] + eyes[1][2], eyes[1][1] + eyes[1][3], padding_x=20, padding_y=40)
        return left_eye, right_eye

    # No eyes detected
    print("No eyes detected in the image.")
    return None, None


def crop_eye(image, eye_coords):
    """
    Crop the eye region from the image based on the given coordinates and add padding.
    """
    padding = 20  # Add 20 pixels padding to each side
    x1 = max(0, min([x for x, y in eye_coords]) - padding)
    y1 = max(0, min([y for x, y in eye_coords]) - padding)
    x2 = min(image.shape[1], max([x for x, y in eye_coords]) + padding)
    y2 = min(image.shape[0], max([y for x, y in eye_coords]) + padding)
    return image[y1:y2, x1:x2]

def crop_with_padding(image, x1, y1, x2, y2, padding_x=20, padding_y=40):
    """
    Crop a region from the image with horizontal and vertical padding.
    """
    x1 = max(0, x1 - padding_x)
    y1 = max(0, y1 - padding_y)  # More padding upwards
    x2 = min(image.shape[1], x2 + padding_x)
    y2 = min(image.shape[0], y2 + padding_y // 2)  # Slight padding below
    return image[y1:y2, x1:x2]
