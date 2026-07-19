import Profile from "./Profile"
import GuestBookLink from "./GuestBookLink";
import HomeLink from "./HomeLink";

import { WRITE, HISTORY, COMMENTS } from "../../constants/icons"
import { Link } from "react-router-dom";

const SUBMIT_WORD = "Submit a Word"
const SUBMISSIONS = "Submission History"

function UserBar({user, onLogout}) {
    return(
<>

<Profile user={user} onLogout={onLogout}/>

        <HomeLink/>

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

        <GuestBookLink/>
</>
)
}

export default UserBar;