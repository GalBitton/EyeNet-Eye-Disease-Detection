from robyn import Robyn, ALLOW_CORS
from src.api.routes.get import router as get_router
from src.api.routes.post import router as post_router
from src.config.settings import ALLOWED_ORIGINS, PORT

app = Robyn(__file__)
ALLOW_CORS(app, origins=ALLOWED_ORIGINS)

app.include_router(get_router)
app.include_router(post_router)

if __name__ == '__main__':
    app.start(port=PORT)
