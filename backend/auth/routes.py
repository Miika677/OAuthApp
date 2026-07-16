from fastapi import APIRouter, Depends, Response
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from backend.db.db import start_session
from backend.auth.services import login_db_service, github_login_url, github_token_exchange, github_get_user, get_current_user_id, get_me
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter()

@router.get("/login/oauth")
def github_login():
    return RedirectResponse(github_login_url())

@router.get("/login/callback")
async def callback(code : str, db : Session = Depends(start_session)):
    access_token = await github_token_exchange(code)
    
    user_dict = await github_get_user(access_token)

    token = login_db_service(user_dict, db)

    response = RedirectResponse(url=f"http://{os.getenv('CLIENT_HOST')}:{os.getenv('CLIENT_PORT')}")
    response.set_cookie(
    key="access_token",
    value=token,
    httponly=True,
    secure=False,
    samesite="lax",
    )

    return response

@router.post("/logout")
def logout():
    response = Response(status_code=204)

    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=False,
        samesite="lax",
    )

    return response

@router.get("/me")
def me(user_id : int = Depends(get_current_user_id), db : Session = Depends(start_session)):
    return get_me(user_id, db)




    


