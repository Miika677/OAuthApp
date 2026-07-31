import { LOGOUT } from "../../constants/icons";

function Profile({user, onLogout}) {
    return(
    <div className="gap-2 py-1 d-flex flex-nowrap flex-lg-wrap align-items-center">
        <div className="d-flex  gap-2 align-items-center py-1">
            <img
                src={user.avatar}
                alt="Avatar"
                style={{width: "45px", height: "45px", borderRadius: "50%" }}
            />

            <span className="d-none d-md-block">
                {user.username}
            </span>

        </div>

        <a className="flex-shrink-0 me-4 me-lg-0" onClick={onLogout}>
            <img
            src={LOGOUT}
            alt="Log out"
            style={{ cursor: "pointer", width: "30px", height: "30px", opacity: 0.5 }}
            />
        </a>
    </div>
    )
}

export default Profile;