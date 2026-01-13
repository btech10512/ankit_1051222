import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  if (!token) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Side: Navigation Links */}
        <div className="nav-links-group">
          <Link to="/" className="nav-link">
            Board
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </div>

        {/* Right Side: Logout Action */}
        <button onClick={handleLogout} className="logout-btn">
          Sign out
        </button>
      </div>
    </nav>
  );
}