from tensorflow.keras.models import load_model
from src.config.settings import MODEL_PATH, MODEL_NAME
from src.utils.logger import logger
from threading import Lock

_model = None
_model_lock = Lock()

def get_model():
    global _model
    if _model is None:
        with _model_lock:
            if _model is None:  # Double-check locking
                logger.info(f'Loading {MODEL_NAME} model ...')
                _model = load_model(MODEL_PATH)
                logger.info(f'{MODEL_NAME} model loaded successfully.')
    return _model
