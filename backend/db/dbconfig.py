from backend.db.db import Base, engine
from backend.db.db_models import Word, User, Vote, Comment

Base.metadata.create_all(bind=engine)