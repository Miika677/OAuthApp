from sqlalchemy.orm import Session
from backend.db.db_models import User
from backend.auth.tokens import create_token

def login_service(username_input : str, db : Session):
    user = db.query(User).filter(User.username == username_input).first()

    if not user:
        user = User(username=username_input)
        db.add(user)
        db.commit()
    
    db.refresh(user)

    token = create_token(user.id)

    return user, token