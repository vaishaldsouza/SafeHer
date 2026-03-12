import React, { useState } from "react";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import SafetyMap from "./components/SafetyMap";
import VehicleCheck from "./components/VehicleCheck";
import VoiceSOS from "./components/VoiceSOS";
import SOSButton from "./components/SOSButton";
import Monitoring from "./components/Monitoring";
import TripMonitor from "./components/TripMonitor";
import NetworkStatus from "./components/NetworkStatus";
import { sendSOS } from "./services/sosService";

function App() {

  const [sosActive, setSosActive] = useState(false);
  const [safetyScore, setSafetyScore] = useState(82);

  const triggerSOS = () => {
    const location = "User GPS Location";
    sendSOS(location);
    setSosActive(true);
    alert("🚨 Emergency SOS Activated!");
    setTimeout(() => setSosActive(false), 5000);
  };

  const simulateEmergency = () => {
    setSafetyScore(25);
    triggerSOS();
  };

  return (
    <div className={`App ${sosActive ? "emergency-mode" : ""}`}>

      <NetworkStatus />
      <Navbar />
      <Hero />
      <Features />

      <section className="safety-score">
        <h2>Area Safety Score</h2>
        <div className="score-circle">{safetyScore}%</div>
        <p>{safetyScore > 70 ? "🟢 Safe" : safetyScore > 40 ? "🟡 Moderate Risk" : "🔴 High Risk"}</p>
      </section>

      <SafetyMap />
      <VehicleCheck />

      <div className="voice-section">
        <h2>Voice Emergency Trigger</h2>
        <VoiceSOS triggerSOS={triggerSOS} />
      </div>

      <Monitoring />
      <TripMonitor />

      <div className="demo-section">
        <button className="demo-btn" onClick={simulateEmergency}>
          Simulate Emergency
        </button>
      </div>

      <SOSButton triggerSOS={triggerSOS} />

      <footer className="footer">
        <h3>SafeHer</h3>
        <p>Smart Women Safety Platform combining SOS alerts, crime awareness, vehicle verification, and offline emergency communication.</p>
        <p>© 2026 SafeHer Project</p>
      </footer>
    </div>
  );
}

export default App;