from backend.db.db import Base, engine
from backend.db.db_models import Comment, User, Vote, Word

Base.metadata.drop_all(bind=engine, tables=[Vote.__table__])
Base.metadata.drop_all(bind=engine, tables=[Comment.__table__])
Base.metadata.drop_all(bind=engine, tables=[User.__table__, Word.__table__])