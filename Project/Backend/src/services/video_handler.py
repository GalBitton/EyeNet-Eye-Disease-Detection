import sys
import os
from constants.paths import UPLOAD_FOLDER, FINAL_VIDEOS_FOLDER


def assemble_video_from_chunks(session_id: str) -> dict:
    session_folder = os.path.join(UPLOAD_FOLDER, session_id)
    final_video_path = os.path.join(FINAL_VIDEOS_FOLDER, f"{session_id}.webm")

    if not os.path.exists(session_folder):
        return {"error": "Session not found"}

    chunks = sorted(os.listdir(session_folder))
    os.makedirs(FINAL_VIDEOS_FOLDER, exist_ok=True)

    with open(final_video_path, "wb") as final_file:
        for chunk_name in chunks:
            chunk_path = os.path.join(session_folder, chunk_name)
            with open(chunk_path, "rb") as chunk_file:
                final_file.write(chunk_file.read())

    return {"status": "video assembled", "video_path": final_video_path}