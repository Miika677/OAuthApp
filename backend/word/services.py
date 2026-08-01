from datetime import datetime, timezone

from sqlalchemy import desc
from sqlalchemy.orm import Session
from sqlalchemy.sql import func

from backend.db.db_models import Word, Vote, User


def get_word_service(db: Session):
    return db.query(Word).order_by(desc(Word.votes_total)).first()

def create_word_service(input : str, id_from_token : int, db: Session):

    exists_word = db.query(Word).filter(Word.word == input.strip().capitalize()).first()
    if exists_word:
        exists_word.votes_total += 1
        exists_word.latest_vote = datetime.now(timezone.utc)
        db.add(Vote(word_id=exists_word.id, user_id=id_from_token))

    else:
        new_word = Word(word = input.strip().capitalize(), latest_vote = func.now(), first_submitted_user_id = id_from_token)
        db.add(new_word)
        db.flush()
        db.add(Vote(word_id=new_word.id, user_id=id_from_token))

    #Set highest voted word
    top_word = db.query(Word).order_by(desc(Word.votes_total)).first()
    top_word.has_been_wotd = True

def get_submissions_service(id_from_token : int, db: Session):
    submitted_words = (
    db.query(Word)
    .join(Vote, Vote.word_id == Word.id)
    .filter(Vote.user_id == id_from_token)
    .all()
    )

    return [
        {
            "word": word.word,
            "is_first_submitted": word.first_submitted_user_id == id_from_token,
            "has_been_wotd" : word.has_been_wotd
        }
        for word in submitted_words
    ]

def look_up_submissions_service(look_up_name : str, db: Session):

    looked_up_user = db.query(User).filter(User.username.ilike(look_up_name)).first()
    if not looked_up_user:
        return None

    submitted_words = (
    db.query(Word)
    .join(Vote, Vote.word_id == Word.id)
    .filter(Vote.user_id == looked_up_user.id)
    .all()
    )

    return [
        {
            "word": word.word,
            "is_first_submitted": word.first_submitted_user_id == looked_up_user.id,
            "has_been_wotd" : word.has_been_wotd
        }
        for word in submitted_words
    ]

