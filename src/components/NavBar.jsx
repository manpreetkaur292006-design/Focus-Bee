import React from "react";
import { Link } from "react-router-dom";
import FocusBeeLogo from "../assets/FocusBeeLogo.png";
import '../App.css'

const NavBar = () => {
  return (
    <div className="main-nav-div">
      <header className="header">
        <div className="title">
          <img src={FocusBeeLogo} alt="Focus Bee Logo" className="logo"/>
          <h1>Focus Bee</h1>
        </div>
        <div className="navbar">
          <nav>
            <ul>
              <li>
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li>
                <Link to="/focus" className="nav-link">Focus-Zone</Link>
              </li>
              <li>
                <Link to="/dashboard" className="nav-link">DashBoard</Link>
              </li>
              <li>
                <Link to="/stats" className="nav-link">Stats</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
