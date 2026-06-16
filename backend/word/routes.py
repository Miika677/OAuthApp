from fastapi import APIRouter, Cookie, Depends, HTTPException
from backend.api.api_models import WordOut, WordIn
from sqlalchemy.orm import Session
from backend.db.db import start_session
from backend.word.services import get_word_service, create_word_service
from backend.auth.services import get_current_user_id
router = APIRouter()

@router.get("/word", response_model= WordOut)
def get_word(db: Session = Depends(start_session)):
    word = get_word_service(db)
    if not word:
        raise HTTPException(status_code=404, detail="No words found")
    
    return word

@router.post("/word")
def create_word(input : WordIn, token_id : int = Depends(get_current_user_id), db: Session = Depends(start_session)):
    create_word_service(input.word, token_id, db)
    db.commit()

    return {"status" : "ok"}