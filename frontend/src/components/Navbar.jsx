// import necessary module
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { logout } = useAuth(); // Destructure isAuthenticated and logout from useAuth hook

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("Failed to logout:", error.message);
    }
  };
  // JSX for navbar component
  return (
    <>
      <nav className="navbar">
        {/* logo takes user back to home page when clicked */}
        <Link to="/home" className="navbar-logo">
          OrganizeMe
        </Link>
        <ul className="nav-items">
          <li className="nav-item">
            <Link to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/categories">Category</Link>
          </li>
          <li className="nav-item">
            <Link to="/taskbin">Task Bin</Link>
          </li>
          <li className="nav-item">
            <Link to="/favourites">Favourites</Link>
          </li>
          <li className="nav-item">
            <Link to="/calendar">Calendar</Link>
          </li>
          <li className="nav-item">
            <a onClick={handleLogout} className="logout-link">
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

// export navbar component
export default Navbar;
