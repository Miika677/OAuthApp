from fastapi import APIRouter, Cookie, Depends, Response
from backend.api.api_models import LoginOut, LoginIn, MeOut
from sqlalchemy.orm import Session
from backend.db.db import start_session
from backend.auth.services import login_service

router = APIRouter()

@router.post("/login", response_model = LoginOut)
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