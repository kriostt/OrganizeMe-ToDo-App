// import necessary module
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  // JSX for navbar component
  return (
    <>
      <nav className="navbar">
        {/* logo takes user back to home page when clicked */}
        <Link to="/home" className="navbar-logo">
          OrganizeMe
        </Link>

        {/* unordered list for navigation items */}
        <ul className="nav-items">
          <li className="nav-item">
            <Link to="/category">Category</Link>
          </li>
          <li className="nav-item">
            <Link to="/trash">Trash</Link>
          </li>
          <li className="nav-item">
            <Link to="/favourites">Favourites</Link>
          </li>
          <li className="nav-item">
            <Link to="/calendar">Calendar</Link>
          </li>
          <li className="nav-item">
            <a>Logout</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

// export navbar component
export default Navbar;
