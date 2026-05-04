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