import base64
import numpy as np
import cv2
import os
import uuid
from src.config.settings import TEMP_IMAGES_DIR

def base64_to_image(base64_string):
    if "," in base64_string:
        base64_string = base64_string.split(",")[1]
    image_data = base64.b64decode(base64_string)
    nparr = np.frombuffer(image_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    temp_path = os.path.join(TEMP_IMAGES_DIR, f"{uuid.uuid4().hex}.png")
    cv2.imwrite(temp_path, img)
    return temp_path

def image_to_base64(image):
    _, buffer = cv2.imencode('.png', image)
    return "data:image/png;base64," + base64.b64encode(buffer).decode()