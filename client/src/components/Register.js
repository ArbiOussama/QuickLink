import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const API_URL = "http://localhost:5000";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post(`${API_URL}/auth/register`, { username, email, password });
            navigate("/");
        } catch (err) {
            setError(err.response.data.message || "Error registering user");
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2 className="register-title">Register</h2>
                <input className="register-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className="register-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="register-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <p className="register-error">{error}</p>}
                <button className="register-button" onClick={handleRegister}>Register</button>
                <p className="register-text">Already have an account? <span className="register-link" onClick={() => navigate("/")}>Login</span></p>
            </div>
        </div>
    );
}

export default Register;