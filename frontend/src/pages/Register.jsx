import { useState } from "react"
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css"

function Register(){
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");

    const [errors,setErrors] = useState({});
    const navigate = useNavigate();



    const submitRegister = (e) =>{
        e.preventDefault();
        api.post("auth/register/", {email,username,password,password2,first_name,last_name})
        .then((res) => {
            if(res.status===201){
                navigate("/login/");
                setEmail("");
                setUsername("");
                setPassword("");
                setPassword2("");
                setFirstName("");
                setLastName("");
            }
        }).catch((err) =>{
            if(err.response && err.response.data) setErrors(err.response.data);
            else alert("Something went wrong");
        });
    }


    return (
        <div className="register-container">
            <div className="form-container">
                <h1>Register Account</h1>
                {Object.keys(errors).length > 0 && (
                <div className="error-container">
                    {Object.entries(errors).map(([key, value]) => (
                        <p key={key} className="error-msg">{value}</p>
                    ))}
                </div>
                )}
                <form onSubmit={submitRegister}>
                    <input 
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="youremail@gmail.com"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    />

                    <input 
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    placeholder="Jane"
                    autoComplete="off"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={first_name}
                    />

                    <input 
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    placeholder="Doe"
                    autoComplete="off"
                    onChange={(e) => setLastName(e.target.value)}
                    value={last_name}
                    />

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

                    <input 
                    type="password"
                    name="password2"
                    id="password2"
                    required
                    placeholder="*********"
                    autoComplete="off"
                    onChange={(e) => setPassword2(e.target.value)}
                    value={password2}
                    />

                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register