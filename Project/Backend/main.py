from robyn import Robyn, ALLOW_CORS
from src.api.routes.get import router as get_router
from src.api.routes.post import router as post_router
from src.config.settings import ALLOWED_ORIGINS, PORT
from src.utils.model_loader import get_model

# Initialize the Robyn application
app = Robyn(__file__)
ALLOW_CORS(app, origins=ALLOWED_ORIGINS)

# Register the routers
app.include_router(get_router)
app.include_router(post_router)

# Load the model at startup
get_model()

if __name__ == '__main__':
    app.start(port=PORT)
