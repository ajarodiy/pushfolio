from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.profile import router as profile_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://pushfolio.vercel.app", "https://ajarodiy.me", "https://ajarodiy.me"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(profile_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Backend is running!"}
