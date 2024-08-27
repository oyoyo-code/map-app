from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import wishlist
from .database import engine
from . import models

app = FastAPI()

# データベース初期化
models.Base.metadata.create_all(bind=engine)

# CORSミドルウェアを追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://172.28.0.1:51266"],  # 本番環境では適切に設定してください
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルーターを追加
app.include_router(wishlist.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Map App API"}
