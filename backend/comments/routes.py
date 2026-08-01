from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.constants.errors import ErrorCodes
from backend.api.api_models import CommentsIn, CommentsOut
from backend.auth.services import get_current_user_id
from backend.comments.services import create_comments_service, get_comments_service
from backend.db.db import start_session

router = APIRouter()

@router.get("/comments", response_model= list[CommentsOut])
def get_comments(db: Session = Depends(start_session)):
    comments = get_comments_service(db)
    if not comments:
        raise HTTPException(
            status_code=404, 
            detail={"code":ErrorCodes.NO_COMMENTS, "message": "No comments found"}
        )
    
    return comments

@router.post("/comments")
def create_comment(input : CommentsIn, token_id : int = Depends(get_current_user_id), db: Session = Depends(start_session)):
    create_comments_service(input.body, token_id, db)
    db.commit()

    return {"status" : "ok"}

@router.post("/comments/debug")
def create_comment_debug(input : CommentsIn, token_id : int = Depends(get_current_user_id), db: Session = Depends(start_session)):
    create_comments_service(input.body, 2, db)
    db.commit()

    return {"status" : "ok"}

