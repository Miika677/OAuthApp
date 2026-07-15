import github from "../assets/github.svg"
import google from "../assets/google.svg"
import logout from "../assets/logout.svg"

import { WRITE, HISTORY, COMMENTS } from "../constants/icons"

import { Link } from "react-router-dom"

function UserBar({user, onLogout}) {

    const SUBMIT_WORD = "Submit a Word"
    const SUBMISSIONS = "Submission History"
    const GUESTBOOK = "Guestbook"

    return(
    <div className="border gap-2 d-flex flex-row flex-lg-column px-2 text-truncate">

        <div className="d-flex flex-lg-wrap gap-2 align-items-center pe-2 pe-lg-0">
            <div className="d-flex flex-lg-wrap gap-2 align-items-center py-1">
                <img
                    src={user.avatar}
                    alt="Avatar"
                    style={{width: "45px", height: "45px", borderRadius: "50%" }}
                />

                <span>
                    {user.username}
                </span>

            </div>

            <a className="flex-shrink-0 me-5 me-lg-0" onClick={onLogout}>
                <img
                src={logout}
                alt="Log out"
                style={{ cursor: "pointer", width: "30px", height: "30px", opacity: 0.5 }}
                />
            </a>
        </div>

        <Link to="/word"
        className="d-flex align-items-center gap-2 py-1 text-decoration-none me-2 me-lg-0"
        >

            <img
            src={WRITE}
            alt={SUBMIT_WORD}
            style={{ cursor: "pointer", width: "30px", height: "30px" }}
            />
            <span className="text-black d-none d-md-block">{SUBMIT_WORD}</span>

        </Link>
        
        <Link to="/submissions"
        className="d-flex  align-items-center gap-2 py-1 text-decoration-none me-2 me-lg-0"
        >

            <img
            src={HISTORY}
            alt={SUBMISSIONS}
            style={{ cursor: "pointer", width: "30px", height: "30px" }}
            />
            <span className="text-black d-none d-md-block">{SUBMISSIONS}</span>

        </Link>

        <Link to="/guestbook"
        className="d-flex align-items-center gap-2 py-1 text-decoration-none me-2 d-lg-none"
        >

            <img
            src={COMMENTS}
            alt={GUESTBOOK}
            style={{ cursor: "pointer", width: "30px", height: "30px" }}
            />
            <span className="text-black d-none d-md-block">{GUESTBOOK}</span>

        </Link>
    </div>  
    ) 

}

export default UserBar;