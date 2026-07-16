import github from "../../assets/github.svg"
import google from "../../assets/google.svg"

import GuestBookLink from "./GuestBookLink";

function LoginBar() {
    return(
    <>
    <div className="d-flex align-items-center gap-2 border-bottom py-1" style={{ height: "60px" }}>
            <span>Sign in</span>
        </div>
        
        <a 
         href="http://localhost:8000/login/oauth"
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
                style={{ cursor: "pointer", width: "30px", height: "30x" }}
            />
            <span>Google</span>
        </a>

        <GuestBookLink/>
    </>
    ) 

}

export default LoginBar;