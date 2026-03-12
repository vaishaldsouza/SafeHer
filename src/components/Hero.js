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
      <div className="hero-content">
        <h1>SafeHer</h1>
        <p>
          Empowering women with smart safety solutions: <br />
          Voice SOS, Offline Alerts, Safe Navigation <br />
          and Vehicle Verification
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
      </div>

      <div className="hero-illustration">
        <img
          src="https://i.ibb.co/0sWm6cT/safeher-illustration.png"
          alt="SafeHer Illustration"
        />
      </div>
    </section>
  );
}

export default Hero;