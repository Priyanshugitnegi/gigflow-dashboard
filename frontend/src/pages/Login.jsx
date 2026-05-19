import { useState } from "react";
import API from "../services/api";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response = await API.post("/auth/login/", {
        username,
        password,
      });

     localStorage.setItem("token", response.data.access);

window.location.href = "/dashboard";

} catch (error) {

  console.log(error.response);

  alert(JSON.stringify(error.response?.data));
}
  };

return (

  <div className="auth-container">

    <div className="auth-card">

      <h2>GigFlow Login</h2>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>

      <p style={{ textAlign: "center" }}>
        Don’t have an account?
        <a href="/register"> Sign Up</a>
      </p>

    </div>

  </div>
);
}

export default Login;