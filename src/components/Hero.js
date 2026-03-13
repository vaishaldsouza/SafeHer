import React from "react";
import "../styles/hero.css";
import VoiceSOS from "./VoiceSOS";

function Hero({ triggerSOS }) {
  return (
    <section className="hero">

      <h1>SafeHer</h1>

      <p>
        A smart women safety platform with SOS alerts, crime zone detection,
        safe route navigation and vehicle verification.
      </p>

      <div className="hero-buttons">
        <VoiceSOS triggerSOS={triggerSOS} />
      </div>

    </section>
  );
}

export default Hero;