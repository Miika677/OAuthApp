from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.api.api_models import SubmissionsOut, WordIn, WordOut
from backend.auth.services import get_current_user_id
from backend.db.db import start_session
from backend.word.services import create_word_service, get_submissions_service, get_word_service

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

@router.get("/submissions", response_model= list[SubmissionsOut])
def get_submissions(token_id : int = Depends(get_current_user_id), db: Session = Depends(start_session)):
    submissions = get_submissions_service(token_id, db)
    if not submissions:
        raise HTTPException(status_code=404, detail="No submitted words")
    
    return submissions