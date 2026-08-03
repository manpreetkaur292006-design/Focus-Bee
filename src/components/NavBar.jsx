import React , {useState} from "react";
import { Link } from "react-router-dom";
import FocusBeeLogo from "../assets/FocusBeeLogo.png";
import "../App.css";

const NavBar = () => {
   const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  return (
    <div className="main-nav-div">
      <header className="header">
        <div className="title">
          <img src={FocusBeeLogo} alt="Focus Bee Logo" className="logo" />
          <h1>Focus Bee</h1>
        </div>

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="navbar">
          <nav>
            <ul className={menuOpen ? "nav-open" : ""}>
              <li>
                <Link to="/" className="nav-link" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/focus" className="nav-link" onClick={closeMenu}>
                  Focus-Zone
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="nav-link" onClick={closeMenu}>
                  DashBoard
                </Link>
              </li>
              <li>
                <Link to="/stats" className="nav-link" onClick={closeMenu}>
                  Stats
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
