from sqlalchemy.orm import Session
from backend.db.db_models import Comment, User
from sqlalchemy.sql import func


def get_comments_service(db: Session):
    comments = (
    db.query(Comment).join(User).all()
    )

    return [
        {
            "id" : comment.id,
            "body" : comment.body,
            "date" : comment.date,
            "user" : {
                "id" : comment.user.id,
                "username" : comment.user.username,
                "avatar" : comment.user.avatar,
                "provider" : comment.user.provider


            }
        }
        for comment in comments
    ]

def create_comments_service(input : str, id_from_token : int, db: Session):

    new_comment = Comment(body = input, date = func.now(), user_id = id_from_token)
    db.add(new_comment)