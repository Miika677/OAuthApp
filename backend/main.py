import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.auth.routes import router as auth_router
from backend.comments.routes import router as comments_router
from backend.word.routes import router as words_router

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = [os.getenv('CLIENT_HOST')],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(words_router)
app.include_router(auth_router)
app.include_router(comments_router)




    

       
    