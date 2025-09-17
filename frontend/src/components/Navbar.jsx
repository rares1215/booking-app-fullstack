import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/profile/" className="nav-logo">
          🤵Profile
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/events/">Events</Link>
          <Link to="/login/">Login</Link>
          <Link to="/register/">Register</Link>
          <Link to="/logout/">Logout</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
