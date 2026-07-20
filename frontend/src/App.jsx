import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "./api.js"
import reactLogo from "./assets/react.svg";

import SubmitWord from "./pages/SubmitWord";
import Submissions from './pages/Submissions.jsx';
import DefaultPage from './pages/DefaultPage.jsx';
import Login from "./pages/Login.jsx"
import GuestBook from './components/GuestBook.jsx';

import SideBar from './components/SideBar/SideBar.jsx';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [topWord, setTopWord] = useState("Loading...");
  const [refreshWord, setRefreshWord] = useState(0);

  const [user, setUser] = useState(null);

  useEffect(()=> {

    const fetchWord = async () => {
      const data = await getRequest("/word");
      if (data) {setTopWord(data.word);} else {setTopWord("-")}
    }

    fetchWord();

  },[refreshWord])

  //Fetch all data
  useEffect(()=> {

    const fetchUser = async () => {
      const data = await getRequest("/me");
      if (data != null) {
        setUser({id: data.id, username: data.username, avatar: data.avatar, provider: data.provider});
      }
    }

    fetchUser();

  }, [])

  //redirect out of guestbook when resizing to desktop
  useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 992px)");

        const redirectIfNeeded = () => {
            if (
                mediaQuery.matches &&
                location.pathname === "/guestbook"
            ) {
                navigate("/", { replace: true });
            }
        };

        redirectIfNeeded();

        mediaQuery.addEventListener("change", redirectIfNeeded);

        return () => {
            mediaQuery.removeEventListener("change", redirectIfNeeded);
        };

    }, [location.pathname, navigate]);


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
            <SideBar user={user} onLogout={handleLogout}/>
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
              <Route path="/word" element={<SubmitWord triggerRefresh={()=> setRefreshWord(r => r + 1)}/>}></Route>
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
