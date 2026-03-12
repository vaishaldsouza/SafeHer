// src/components/Navbar.js
import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  // Scroll to section by id
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">SafeHer</div>
      <ul className="nav-links">
        <li>
          <button onClick={() => scrollToSection("home")}>Home</button>
        </li>
        <li>
          <button onClick={() => scrollToSection("features")}>Features</button>
        </li>
        <li>
          <button onClick={() => scrollToSection("map")}>Map</button>
        </li>
        <li>
          <button onClick={() => scrollToSection("vehicle")}>Vehicle Check</button>
        </li>
        <li>
          <button onClick={() => scrollToSection("contact")}>Contact</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;