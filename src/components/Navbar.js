import React from "react";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        🛡 <span>SafeHer</span>
      </div>

      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#map">Safety Map</a>
        <a href="#vehicle">Vehicle Check</a>
        <a href="#trip">Trip Monitor</a>
        <a href="#sos">SOS</a>
      </div>

    </nav>
  );
}

export default Navbar;