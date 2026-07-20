import { GITHUB_LOGO, GOOGLE_LOGO } from "../../constants/icons";
import GuestBookLink from "./GuestBookLink";
import HomeLink from "./HomeLink";

function LoginBar() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    return(
    <>
    <div className="d-flex align-items-center gap-2 border-bottom py-1" style={{ height: "60px" }}>
            <span>Sign in</span>
        </div>
        
        <a 
         href={`${backendUrl}/login/oauth`}
         className="d-flex align-items-center gap-2 border-bottom py-1 text-decoration-none"
        >
            <img
                src={GITHUB_LOGO}
                alt="GitHub"
                style={{ cursor: "pointer", width: "30px", height: "30px" }}
            />
            <span className="d-none d-md-flex">GitHub</span>
        </a>

        <a 
         className="d-flex align-items-center gap-2 py-1 text-decoration-none"
        >
            <img
                src={GOOGLE_LOGO}
                alt="Google"
                style={{width: "30px", height: "30x", opacity: 0.5  }}
                title="Coming Soon!"
            />
            <span className="d-none d-md-flex" style={{opacity: 0.5 }}>Google</span>
        </a>

        <div className="d-flex d-lg-none">
            <HomeLink/>
        </div>

        <GuestBookLink/>
    </>
    ) 

}

export default LoginBar;