import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import {
  FiHome,
  FiPlusCircle,
  FiBook,
  FiInbox,
  FiLogIn,
  FiUserPlus,
  FiLogOut,
} from "react-icons/fi";

import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="nav-wrapper">
      <nav className="navbar-pill">
        <Link to="/" className="nav-item">
          <FiHome />
          <span>Home</span>
        </Link>

        {!token && (
          <>
            <Link to="/login" className="nav-item">
              <FiLogIn />
              <span>Login</span>
            </Link>

            <Link to="/register" className="nav-item">
              <FiUserPlus />
              <span>Register</span>
            </Link>
          </>
        )}

        {token && (
          <>
            <Link to="/dashboard" className="nav-item">
              <MdDashboard size={22} />
              Dashboard
            </Link>
            <Link to="/add-book" className="nav-item">
              <FiPlusCircle />
              <span>Add Book</span>
            </Link>

            <Link to="/my-books" className="nav-item">
              <FiBook />
              <span>My Books</span>
            </Link>

            <Link to="/requests" className="nav-item">
              <FiInbox />
              <span>Requests</span>
            </Link>

            <button className="nav-item logout-button" onClick={logout}>
              <FiLogOut />
              <span>Logout</span>
            </button>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
