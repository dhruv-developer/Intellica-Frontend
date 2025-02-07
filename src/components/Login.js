import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const loginUser = async () => {
    try {
      const response = await axios.post("http://localhost:8000/user/login/", {
        email,
        password,
      });
      setMessage("Login Successful!");
      setTimeout(() => navigate("/dashboard"), 1000); // Redirect after login
    } catch (error) {
      setMessage("Invalid credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-secondary shadow-md rounded">
      <h2 className="text-2xl font-bold text-center text-white">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button onClick={loginUser} className="w-full bg-primary text-white p-2 rounded">
        Login
      </button>
      <p className="text-center text-white">{message}</p>
    </div>
  );
};

export default Login;
