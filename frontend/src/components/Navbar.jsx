import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../constants";

function Navbar() {

  const [auth, setAuth] = useState(false);
  const location = useLocation();

  useEffect(()=>{
    const token = localStorage.getItem(ACCESS_TOKEN);
    setAuth(!token);
  },[location])

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🎉</span> Eventify
        </Link>

        {/* Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/events/">Events</Link>
          <Link to="/profile/">Profile</Link>

          {/* Auth buttons */}

          {auth?
          <>
          <Link to="/login/" className="nav-btn login-btn">
            Login
          </Link>
          <Link to="/register/" className="nav-btn register-btn">
            Register
          </Link>
          </>
          :
          <Link to="/logout/" className="nav-btn logout-btn">
            Logout
          </Link>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

