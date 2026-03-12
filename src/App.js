// src/App.js
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import SafetyMap from "./components/SafetyMap";
import VehicleCheck from "./components/VehicleCheck";
import VoiceSOS from "./components/VoiceSOS";
import SOSButton from "./components/SOSButton";
import { sendSOS } from "./services/sosService";

function App() {
  // Default location (e.g., Bangalore)
  const [userLocation, setUserLocation] = useState({ lat: 12.9716, lng: 77.5946 });
  const [contacts, setContacts] = useState(["+1234567890"]); // emergency contacts

  // Get user GPS location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => console.log("Location error:", err)
      );
    }
  }, []);

  // Offline SOS listener: send pending SOS alerts when back online
  useEffect(() => {
    const sendPendingSOS = async () => {
      const pendingSOS = JSON.parse(localStorage.getItem("pendingSOS")) || [];
      if (pendingSOS.length > 0) {
        for (let sos of pendingSOS) {
          try {
            await fetch("http://localhost:5000/sos", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(sos),
            });
          } catch (err) {
            console.log("Still offline:", err);
            return; // stop if still offline
          }
        }
        localStorage.removeItem("pendingSOS");
        alert("Pending SOS alerts sent successfully!");
      }
    };

    window.addEventListener("online", sendPendingSOS);
    return () => window.removeEventListener("online", sendPendingSOS);
  }, []);

  // Trigger SOS manually (from button or voice)
  const handleSOS = () => {
    sendSOS(contacts, userLocation);
  };

  return (
    <div className="App">
  <Navbar />

  {/* Hero / Landing */}
  <Hero id="home" />

  {/* Features */}
  <Features id="features" />

  {/* Safety Map Section */}
  <section id="map" className="section-wrapper">
    <h2 style={{ color: "#fff", marginBottom: "20px" }}>Safety Map</h2>
    <SafetyMap userLocation={userLocation} />
  </section>

  {/* Vehicle Verification Section */}
  <section id="vehicle" className="section-wrapper">
    <h2 style={{ color: "#fff", marginBottom: "20px" }}>Vehicle Verification</h2>
    <VehicleCheck />
  </section>

  {/* Voice SOS */}
  <VoiceSOS triggerSOS={handleSOS} />

  {/* SOS Button */}
  <SOSButton triggerSOS={handleSOS} />
</div>
  );
}

export default App;