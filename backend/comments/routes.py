from fastapi import APIRouter, Depends, HTTPException
from backend.api.api_models import CommentsOut, CommentsIn
from sqlalchemy.orm import Session
from backend.db.db import start_session
from backend.comments.services import get_comments_service, create_comments_service
from backend.auth.services import get_current_user_id
router = APIRouter()

@router.get("/comments", response_model= list[CommentsOut])
def get_comments(db: Session = Depends(start_session)):
    comments = get_comments_service(db)
    if not comments:
        raise HTTPException(status_code=404, detail="No comments found")
    
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

