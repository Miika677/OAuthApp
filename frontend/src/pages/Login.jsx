import { useState } from "react";

function Login() {
  const [loginInput, setLoginInput] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return(
        <div>
          <p>Log In</p>
          <div className="d-flex gap-2">
            <input
            type="text"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
            placeholder="Username"
            />
            <button className="btn btn-primary" onClick={() => window.location.href = `${backendUrl}/login/oauth`}>Login</button>
          </div>
        </div>
      )
}

export default Login;