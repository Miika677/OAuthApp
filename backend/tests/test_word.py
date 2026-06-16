from backend.auth.tokens import create_token, decode_token
from backend.db.db_models import Vote
def test_create_word_unauthorized(client):
    response = client.post("/word", json={"word": "test"})

    assert response.status_code == 401

def test_create_word_authorized(client):
    token = create_token(1)
    client.cookies.set("access_token", token)
    response = client.post("/word", json={"word": "test"})

    assert response.status_code == 200

def test_check_word(client):
    token = create_token(1)
    client.cookies.set("access_token", token)
    post_response = client.post("/word", json={"word": "test"})
    assert post_response.status_code == 200

    response = client.get("/word")

    assert response.status_code == 200
    assert response.json()["word"] == "test"

def test_check_votes(client, db_session):
    token = create_token(1)
    client.cookies.set("access_token", token)

    client.post("/word", json={"word": "test"})
    votes = db_session.query(Vote).all()
    assert len(votes) == 1
    
    client.post("/word", json={"word": "test"})
    votes = db_session.query(Vote).all()
    assert len(votes) == 2