import { useState } from "react";
import API from "../services/api";

function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      await API.post("/auth/register/", {
        username,
        email,
        password,
      });

      alert("Registration Successful");

      window.location.href = "/";

    } catch (error) {

  console.log(error.response);

  alert(JSON.stringify(error.response?.data));
}

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>
          Sign Up
        </button>

        <p style={{ textAlign: "center" }}>
          Already have an account?
          <a href="/"> Login</a>
        </p>

      </div>

    </div>
  );
}

export default Register;