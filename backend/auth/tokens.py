from fastapi import Depends
from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "supersecret123"  # should eventually be an env var
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24

def create_token(user_id: int):
    payload = {
        "userId": user_id,
        "exp": datetime.now() + timedelta(hours=24)  # token expires in 24h
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token : str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]).get("userId")