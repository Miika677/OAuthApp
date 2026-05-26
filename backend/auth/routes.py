from fastapi import APIRouter, Cookie, Depends, Response
from fastapi.responses import RedirectResponse
from backend.api.api_models import LoginOut, LoginIn
from sqlalchemy.orm import Session
from backend.db.db import start_session
from backend.auth.services import login_service, github_login_url

router = APIRouter()

@router.post("/login/placeholder", response_model = LoginOut)
def login(userLogin : LoginIn, response : Response, db : Session = Depends(start_session)):
    user, token = login_service(userLogin.username, db)

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax"
    )

    return user

@router.get("/login/oauth")
def github_login():
    return RedirectResponse(github_login_url)

