import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { getRequest, postRequest } from "./api.js"
import reactLogo from "./assets/react.svg";
import './App.css'

function SubmitWord() {
  const [wordInput, setWordInput] = useState("");

  async function handleSubmitWord(postedWord) {

      await postRequest("/word", {word : postedWord});
  }

  return(
        <div>
          <p>Submit a word</p>
          <div className="d-flex gap-2">
            <input
            type="text"
            value={wordInput}
            onChange={(e) => setWordInput(e.target.value)}
            placeholder="Type something..."
            />
            <button className="btn btn-primary" onClick={() => handleSubmitWord(wordInput)}>Submit Word</button>
          </div>
        </div>
      )
}

function Login() {
  const [loginInput, setLoginInput] = useState("");

  return(
        <div className="d-flex flex-column justify-content-center mt-5">
          <p>Log In</p>
          <div className="d-flex gap-2 justify-content-center">
            <input
            type="text"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
            placeholder="Username"
            />
            <button className="btn btn-primary" onClick={() => window.location.href = "http://localhost:8000/login/oauth"}>Login</button>
          </div>
        </div>
      )
}

function App() {
  const [topWord, setTopWord] = useState("Loading...");
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(reactLogo);

  useEffect(()=> {
    const fetchWord = async () => {
      const data = await getRequest("/word");
      setTopWord(data.word);
      console.log(data.word);
    }

    const fetchUser = async () => {
      const data = await getRequest("/me");
      setUser(data.username);
      setAvatar(data.avatar);
    }

    fetchWord(); 
    fetchUser();

  }, [])
    
  return (
      <BrowserRouter>
        <nav>
          <Link to="/">Word Submission</Link>
          <Link to="/login">Login</Link>
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <img src={avatar} alt="User avatar" style={{ width: "50px", height: "50px", borderRadius: "50%" }}/>
            <p>{user}</p>
          </div>
        </nav>
        <h1>Word of the Day</h1>
        <p>{topWord}</p>

        <Routes>
          <Route path="/" element={<SubmitWord/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    );
}

export default App
