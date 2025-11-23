from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
from fastapi.responses import JSONResponse
import os
import uuid
from app.dependencies import get_current_admin

router = APIRouter(prefix="/api/admin", tags=["Upload"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload-image")
async def upload_image(
    file: UploadFile = File(...),
    admin = Depends(get_current_admin)
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(400, detail="Only image files allowed")

    file_ext = file.filename.split(".")[-1].lower()
    if file_ext not in ["jpg", "jpeg", "png", "webp", "gif"]:
        raise HTTPException(400, detail="Invalid image format")

    filename = f"{uuid.uuid4()}.{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

   
    image_url = f"http://127.0.0.1:8000/uploads/{filename}"  

    return {"image_url": image_url}