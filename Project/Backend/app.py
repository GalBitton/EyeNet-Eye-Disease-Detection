import os
#from utils.detection import detect_face_and_eyes

app = FastAPI()

UPLOAD_FOLDER = "uploaded_chunks"
FINAL_VIDEOS_FOLDER = "final_videos"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(FINAL_VIDEOS_FOLDER, exist_ok=True)

# להתיר קריאות מה-Frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# קבלת chunk
@app.post("/upload")
async def upload_chunk():
    # session_folder = os.path.join(UPLOAD_FOLDER, session_id)
    # os.makedirs(session_folder, exist_ok=True)
    #
    # chunk_path = os.path.join(session_folder, chunk.filename)
    #
    # with open(chunk_path, "wb") as buffer:
    #     shutil.copyfileobj(chunk.file, buffer)
    #

    print("test")
    return JSONResponse(content={"status": "ASDASDASD"})

# סיום session
@app.post("/finish_session")
def finish_session(session_id: str):
    session_folder = os.path.join(UPLOAD_FOLDER, session_id)
    final_video_path = os.path.join(FINAL_VIDEOS_FOLDER, f"{session_id}.webm")

    if not os.path.exists(session_folder):
        return JSONResponse(content={"error": "Session not found"}, status_code=404)

    chunks = sorted(os.listdir(session_folder))

    with open(final_video_path, "wb") as final_file:
        for chunk_name in chunks:
            chunk_path = os.path.join(session_folder, chunk_name)
            with open(chunk_path, "rb") as chunk_file:
                final_file.write(chunk_file.read())

    return JSONResponse(content={"status": "video assembled", "video_path": final_video_path})
