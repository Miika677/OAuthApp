import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { getRequest, postRequest } from "./api.js"
import reactLogo from "./assets/react.svg";

import SubmitWord from "./pages/SubmitWord";
import Submissions from './pages/Submissions.jsx';
import DefaultPage from './pages/DefaultPage.jsx';
import Login from "./pages/Login.jsx"
import GuestBook from './components/GuestBook.jsx';

import UserBar from './components/UserBar.jsx';
import LoginBar from './components/LoginBar.jsx';

function App() {
  const [topWord, setTopWord] = useState("Loading...");
  const [user, setUser] = useState(null);

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(null);

  useEffect(()=> {
    
    const fetchWord = async () => {
      const data = await getRequest("/word");
      setTopWord(data.word);
      console.log(data.word);
    }

    const fetchUser = async () => {
      const data = await getRequest("/me");
      if (data != null) {
        setUser({id: data.id, username: data.username, avatar: data.avatar, provider: data.provider});
      }
    }

    const fetchComments = async () => {
      const data = await getRequest("/comments");
      if (data != null) {
        setComments(data);
      }

    }

    fetchWord(); 
    fetchUser();
    fetchComments();

  }, [])

  const handleLogout = async () => {
    await postRequest("/logout");
    setUser(null);
    setAvatar(reactLogo);
  }

  return (
    <div className="container-fluid">

      <div className="row desktop-full-height">
        <div className="col-12 col-lg-2">
          <div className="p-4">
            {user ?
              (
                <UserBar user={user} onLogout={handleLogout}/>
              ) : (
                <LoginBar/>
              )
            }
          </div>
          
        </div>

        <div className="col-12 col-lg-6 px-0 px-lg-5 d-flex flex-column align-items-center bg-body-tertiary">

          <div className="py-4 d-flex flex-column align-items-center">
            <p className="text-muted text-center"><small>DISCLAIMER: Site is still under development! Vote counts and words may disappear at whim.</small></p>
            <h2>Word of the Day</h2>
            <div className="bg-body p-2 rounded-4">
              <h1>{topWord}</h1>
            </div>
          </div>

          <div className="bg-body p-2 mx-2 mt-lg-4 align-items-center rounded-4 w-100">
            <Routes>
              <Route path="/" element={<DefaultPage/>} />
              <Route path="/word" element={<SubmitWord/>} />
              <Route path="/submissions" element={<Submissions/>} />
              <Route path="/guestbook" element={<GuestBook currentUser={user}/>} />
            </Routes>
          </div>

        </div>

        <div className="col-12 col-lg-4 p-4 d-none d-lg-flex h-100">
            <GuestBook currentUser={user}/>
        </div>

      </div>

    </div>
  );
}

export default App
