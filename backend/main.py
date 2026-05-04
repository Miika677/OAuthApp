from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.word.routes import router as words_router
from backend.auth.routes import router as auth_router



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(words_router)
app.include_router(auth_router)




    

       
    