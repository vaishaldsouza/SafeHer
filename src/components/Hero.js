// src/components/Hero.js
import React from "react";
import "../styles/hero.css";

function Hero() {
  // Scroll to Features section when button clicked
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero" id="home">
      <h1>SafeHer</h1>
      <p>
        Smart Women Safety Platform with <br />
        Voice SOS, Offline Alerts, <br />
        Safe Navigation and Vehicle Verification
      </p>

      <div className="hero-buttons">
        <button
          className="btn-primary"
          onClick={() => alert("Emergency Demo Triggered!")}
        >
          🚨 Emergency Demo
        </button>

        <button className="btn-secondary" onClick={scrollToFeatures}>
          Explore Features
        </button>
      </div>
    </section>
  );
}

export default Hero;