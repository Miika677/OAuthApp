import github from "../../assets/github.svg"
import google from "../../assets/google.svg"

import GuestBookLink from "./GuestBookLink";

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
                src={github}
                alt="GitHub"
                style={{ cursor: "pointer", width: "30px", height: "30px" }}
            />
            <span>GitHub</span>
        </a>

        <a 
         className="d-flex align-items-center gap-2 py-1 text-decoration-none"
        >
            <img
                src={google}
                alt="Google"
                style={{width: "30px", height: "30x", opacity: 0.5  }}
                title="Coming Soon!"
            />
            <span style={{opacity: 0.5 }}>Google</span>
        </a>

        <GuestBookLink/>
    </>
    ) 

}

export default LoginBar;