from sqlalchemy.orm import Session
from backend.db.db_models import User
from backend.auth.tokens import create_token
import os
from urllib.parse import urlencode


GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
GITHUB_URI = os.getenv("GITHUB_URI")

def github_login_url():
    params={
        "client_id": GITHUB_CLIENT_ID,
        "redirect_uri": GITHUB_URI,
        "scope": "read:user",
    }

    return f"https://github.com/login/oauth/authorize?{urlencode(params)}"

def login_service(username_input : str, db : Session):
    user = db.query(User).filter(User.username == username_input).first()

    if not user:
        user = User(username=username_input)
        db.add(user)
        db.commit()
    
    db.refresh(user)

    token = create_token(user.id)

    return user, token