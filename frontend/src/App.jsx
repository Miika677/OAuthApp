import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { getRequest, postRequest } from "./api.js"
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

function Login({ setUserProp }) {
  const [loginInput, setLoginInput] = useState("");

  async function handleLogin(input) {
    if (input.trim().length === 0) {
      console.log("Error");
      return;
    } else {
      const dataUser = await postRequest("/login", { username: input });

      setUserProp({"username" : dataUser.username});
      
    }
  }

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
            <button className="btn btn-primary" onClick={() => handleLogin(loginInput)}>Login</button>
          </div>
        </div>
      )
}

function App() {
  const [topWord, setTopWord] = useState("Loading...");
  const [user, setUser] = useState(null);

  useEffect(()=> {
    const fetchWord = async () => {
      const data = await getRequest("/word");
      setTopWord(data.word);
      console.log(data.word);
    }

    fetchWord(); 

  }, [])
    
  return (
      <BrowserRouter>
        <nav>
           <Link to="/">Word Submission</Link>
           <Link to="/login">Login</Link>
           <p>{user?.username}</p>
        </nav>
        <h1>Word of the Day</h1>
        <p>{topWord}</p>

        <Routes>
          <Route path="/" element={<SubmitWord/>} />
          <Route path="/login" element={<Login setUserProp={setUser}/>} />
        </Routes>
      </BrowserRouter>
    );
}

export default App
