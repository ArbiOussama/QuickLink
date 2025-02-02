import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const API_URL = "quick-link-seven.vercel.app";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [originalUrl, setOriginalUrl] = useState("");
    const [urls, setUrls] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return navigate("/");

                const userRes = await axios.get(`${API_URL}/auth/userInfo`, { headers: { Authorization: `Bearer ${token}` } });
                setUser(userRes.data);

                const urlsRes = await axios.get(`${API_URL}/url/user-urls`, { headers: { Authorization: `Bearer ${token}` } });
                console.log(urlsRes)
                if (urlsRes.status === 404) {
                    setUrls([]);
                } else {
                    setUrls(urlsRes.data);
                }
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setUrls([]);
                } else {
                    navigate("/");
                }
            }
        };
        fetchData();
    }, [navigate]);

    const shortenUrl = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(`${API_URL}/url/shorten`, { originalUrl }, { headers: { Authorization: `Bearer ${token}` } });
            setUrls([...urls, res.data]);
            setError("");
        } catch (err) {
            setError(err.response.data.message || "Error shortening URL");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-box">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Welcome {user?.username}</h1>
                    <button className="dashboard-logout" onClick={logout}>Logout</button>
                </div>
                <p className="dashboard-email">{user?.email}</p>
                <div className="dashboard-input-container">
                    <input className="dashboard-input" type="text" placeholder="Enter URL" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} />
                    {error && <p className="dashboard-error">{error}</p>}
                    <button className="dashboard-button" onClick={shortenUrl}>Shorten</button>
                </div>
                <ul className="dashboard-url-list">
                    {urls.map((url) => (
                        <li key={url.shortId} className="dashboard-url-item">
                            <a className="dashboard-url-link" href={`quick-link-seven.vercel.app/url/${url.shortId}`} target="_blank" rel="noopener noreferrer">{`http://quick-link-seven.vercel.app/url/${url.shortId}`}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;