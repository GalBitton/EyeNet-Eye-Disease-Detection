from robyn import Robyn, ALLOW_CORS
from src.api.routes.get import router as get_router
from src.api.routes.post import router as post_router
from src.utils.model_loader import model

app = Robyn(__file__)
ALLOW_CORS(app, origins=["http://localhost:5173"])


app.include_router(get_router)
app.include_router(post_router)

app.start(port=8000)
