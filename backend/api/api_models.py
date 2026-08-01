from datetime import datetime

from pydantic import BaseModel

class OrmBaseModel(BaseModel):
    class Config:
        orm_mode = True

class WordOut(OrmBaseModel):
    word: str

class WordIn(OrmBaseModel):
    word : str

class LoginIn(OrmBaseModel):
    username : str

class LoginOut(OrmBaseModel):
    username : str

class MeOut(OrmBaseModel):
    id : int
    username : str

class SubmissionsOut(OrmBaseModel):
    word : str
    is_first_submitted : bool
    has_been_wotd : bool

class UserOut(OrmBaseModel):
    id: int
    username: str
    avatar: str | None
    provider: str

class CommentsIn(OrmBaseModel):
    body : str

class CommentsOut(OrmBaseModel):
    id : int
    body: str
    date : datetime
    user : UserOut