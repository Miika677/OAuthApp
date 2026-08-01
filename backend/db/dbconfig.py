from backend.db.db import Base, engine
from backend.db.db_models import Comment, User, Vote, Word

Base.metadata.create_all(bind=engine)