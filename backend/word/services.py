
from datetime import datetime, timezone
from sqlalchemy import desc
from sqlalchemy.sql import func
from sqlalchemy.orm import Session
from backend.db.db_models import Word, Vote
from backend.auth.tokens import decode_token


def get_word_service(db: Session):
    return db.query(Word).order_by(desc(Word.votes_total)).first()

def create_word_service(input : str, id_from_token : int, db: Session):

    exists_word = db.query(Word).filter(Word.word == input).first()
    if exists_word:
        exists_word.votes_total += 1
        exists_word.latest_vote = datetime.now(timezone.utc)
        db.add(Vote(word_id=exists_word.id, user_id=id_from_token))

    else:
        new_word = Word(word = input, latest_vote = func.now())
        db.add(new_word)
        db.flush()
        db.add(Vote(word_id=new_word.id, user_id=id_from_token))

