from tensorflow.keras.models import load_model
from src.config.settings import MODEL_PATH, MODEL_NAME
from src.utils.logger import logger

model = None

def get_model():
    global model
    if model is None:
        logger.info(f'Loading {MODEL_NAME} model ...')
        model = load_model(MODEL_PATH)
        logger.info(f'{MODEL_NAME} model loaded successfully.')

    return model

