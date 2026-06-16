from sqlalchemy.orm import Session
from backend.db.db_models import User
from backend.auth.tokens import create_token, decode_token
import os
import httpx
from fastapi import HTTPException, Cookie
from urllib.parse import urlencode


GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
GITHUB_URI = os.getenv("GITHUB_URI")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")

def github_login_url():
    params={
        "client_id": GITHUB_CLIENT_ID,
        "redirect_uri": GITHUB_URI,
        "scope": "read:user",
    }

    return f"https://github.com/login/oauth/authorize?{urlencode(params)}"


#TODO: use "user" in callback route to create user in db
def login_db_service(oauth_info : dict, db : Session):
    user = db.query(User).filter(
        User.provider == oauth_info["provider"],
        User.provider_id == oauth_info["provider_id"], 
    ).first()

    if not user:
        user = User(**oauth_info)
        db.add(user)
        db.commit()
    
    db.refresh(user)

    token = create_token(user.id)

    return token

async def github_token_exchange(code : str):
    async with httpx.AsyncClient() as client:
        res = await client.post(
            "https://github.com/login/oauth/access_token",

            headers={
                "Accept": "application/json"
            },

            data={
                "client_id": GITHUB_CLIENT_ID,
                "client_secret": GITHUB_CLIENT_SECRET,
                "code": code,
            },
        )

        data = res.json()

        if "access_token" not in data:
             raise HTTPException(status_code=400, detail="GitHub token exchange failed")

        return data["access_token"]
    
async def github_get_user(access_token : str):
    async with httpx.AsyncClient() as client:
        res = await client.get(
            "https://api.github.com/user",

            headers={
                "Authorization": f"Bearer {access_token}",
                "Accept": "application/vnd.github+json",
            },
        )

        user = res.json()

        #TODO: Turn data normalization into helper function when more OAuth login methods are added
        #TODO: At that point different oauth methods should be grouped into their own files
        return {
            "provider" : "github",
            "provider_id" : user["id"],
            "username" : user["login"],
            "avatar" : user["avatar_url"]
        }
    
def get_current_user_id(access_token : str = Cookie(None)):
    if not access_token:
        raise HTTPException(status_code=401, detail="No access token")
    
    return decode_token(access_token)

def get_me(user_id : int, db : Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "username": user.username,
        "avatar": user.avatar
        }

    



