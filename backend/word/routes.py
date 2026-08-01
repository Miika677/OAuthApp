from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.constants.errors import ErrorCodes
from backend.api.api_models import SubmissionsOut, WordIn, WordOut
from backend.auth.services import get_current_user_id
from backend.db.db import start_session
from backend.word.services import create_word_service, get_submissions_service, get_word_service, look_up_submissions_service

router = APIRouter()

@router.get("/word", response_model= WordOut)
def get_word(db: Session = Depends(start_session)):
    word = get_word_service(db)
    if not word:
        raise HTTPException(
            status_code=404, 
            detail={"code":ErrorCodes.NO_SUBMISSIONS, "message": "No submitted words"}
        )
    
    return word

@router.post("/word")
def create_word(input : WordIn, token_id : int = Depends(get_current_user_id), db: Session = Depends(start_session)):
    create_word_service(input.word, token_id, db)
    db.commit()

    return {"status" : "ok"}

@router.get("/submissions", response_model= list[SubmissionsOut])
def get_submissions(username : Optional[str] = None, token_id : int = Depends(get_current_user_id), db: Session = Depends(start_session)):

    if not username:
        submissions = get_submissions_service(token_id, db)
        if not submissions:
            raise HTTPException(
                status_code=404, 
                detail={"code":ErrorCodes.NO_SUBMISSIONS, "message": "No submitted words"}
            )
          
    if username:
        submissions = look_up_submissions_service(username, db)

        if submissions is None:
            raise HTTPException(
                status_code=404, 
                detail={"code":ErrorCodes.USER_NOT_FOUND, "message": "No user found"}
            )

        if not submissions:
            raise HTTPException(
                status_code=404, 
                detail={"code":ErrorCodes.NO_SUBMISSIONS, "message": "No submitted words"}
            )
    
    return submissions