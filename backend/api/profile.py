from fastapi import APIRouter
from backend.firestore import db

router = APIRouter()

@router.get("/profile/{username}")
async def get_profile(username: str):
    doc_ref = db.collection("github_profiles").document(username)
    doc = doc_ref.get()
    
    if doc.exists:
        return {"source": "cache", "data": doc.to_dict()}
    else:
        return {"source": "new", "data": None}
