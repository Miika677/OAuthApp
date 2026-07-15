import github from "../assets/github.svg"
import google from "../assets/google.svg"

function LoginBar() {
    return(
    <div className="border px-2 min-vh-100">
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

    </div>  
    ) 

}

export default LoginBar;