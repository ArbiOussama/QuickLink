import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const API_URL = "https://quick-link-seven.vercel.app";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response.data.message || "Invalid credentials");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                <input className="login-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="login-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <p className="login-error">{error}</p>}
                <button className="login-button" onClick={handleLogin}>Login</button>
                <p className="login-text">Don't have an account? <span className="login-link" onClick={() => navigate("/register")}>Register</span></p>
            </div>
        </div>
    );
}

export default Login;