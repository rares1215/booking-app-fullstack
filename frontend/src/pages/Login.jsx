import { useState } from "react"
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css"

function Login()
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();



    const submitLogin = (e) =>{
        e.preventDefault();
        api.post("auth/token/", {username,password})
        .then((res) =>{
            if(res.status===200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/events/");
            }
        }).catch((err) =>{
            if(err.response && err.response.data) setErrors(err.response.data);
            else alert("Something went wrong!");
        });
    }



return (
    <div className="login-container">
        <div className="form-container">
            <h1>Login Page</h1>
            {Object.keys(errors).length > 0 && (
            <div className="error-container">
                {Object.entries(errors).map(([key, value]) => (
                    <p key={key} className="error-msg">{value}</p>
                ))}
            </div>
            )}
            <form onSubmit={submitLogin}>
                <input 
                type="text"
                name="username"
                id="username"
                required
                placeholder="username123"
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                value={username} 
                />
                <input 
                type="password"
                name="password"
                id="password"
                required
                placeholder="*********"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                 />
                 <button type="submit">Login</button>
            </form>
        <div className="form-footer">
            <p>Don’t have an account? <a href="/register">Register</a></p>
        </div>
        </div>
    </div>
)


}

export default Login