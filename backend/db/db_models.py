from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import relationship

from backend.db.db import Base

class Word(Base):
    __tablename__ = "words"
    id = Column(Integer, primary_key=True, index=True)
    word = Column(String, unique=True, nullable=False)
    votes_total = Column(Integer, default=0)
    latest_vote = Column(DateTime(timezone=True))
    first_submitted_user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    has_been_wotd = Column(Boolean, default=False,  nullable=False)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)

    provider = Column(String, nullable=False)
    provider_id = Column(Integer)

    username = Column(String)
    avatar = Column(String, nullable=True)

    __table_args__ = (
    UniqueConstraint("provider", "provider_id"),
)

class Vote(Base):
    __tablename__ = "votes"
    id = Column(Integer, primary_key=True, index=True)
    word_id = Column(Integer, ForeignKey("words.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    word = relationship("Word")
    user = relationship("User")

class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    body = Column(String, unique=True, nullable=False)
    date = Column(DateTime(timezone=True))

    user = relationship("User")



    