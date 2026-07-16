import { Link } from "react-router-dom";
import { COMMENTS } from "../../constants/icons"
const GUESTBOOK = "Guestbook"

function GuestBookLink(){
    return(
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
    )
}

export default GuestBookLink;