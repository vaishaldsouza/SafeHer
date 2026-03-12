// src/App.js
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import SafetyMap from "./components/SafetyMap";
import VehicleCheck from "./components/VehicleCheck";
import VoiceSOS from "./components/VoiceSOS";
import SOSButton from "./components/SOSButton";
import Contact from "./components/Contact";

import { sendSOS } from "./services/sosService";
import { listenForSOS } from "./services/voiceService";
import { getOffline, removeOffline } from "./services/offlineService";
import { shareLocation } from "./services/shareLocationService";
import { checkUnsafeZone } from "./services/notificationService";
import mapService from "./services/mapService";

function App() {
  const [userLocation, setUserLocation] = useState({ lat: 12.9716, lng: 77.5946 });
  const [contacts, setContacts] = useState(["+919380256014"]); // emergency contacts
  const [crimeZones, setCrimeZones] = useState([]);

  // Get user GPS location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
          setUserLocation(loc);
          // Optional: share live location
          shareLocation("demoUser", loc);
          // Optional: check if in unsafe zone
          checkUnsafeZone(loc, crimeZones);
        },
        (err) => console.log("Location error:", err)
      );
    }
  }, [crimeZones]);

  // Load crime zones from backend
  useEffect(() => {
    mapService.getCrimeZones().then((zones) => setCrimeZones(zones));
  }, []);

  // Offline SOS listener: send pending SOS alerts when back online
  useEffect(() => {
    const sendPendingSOS = async () => {
      const pendingSOS = getOffline("pendingSOS");
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
            return;
          }
        }
        removeOffline("pendingSOS");
        alert("Pending SOS alerts sent successfully!");
      }
    };
    window.addEventListener("online", sendPendingSOS);
    return () => window.removeEventListener("online", sendPendingSOS);
  }, []);

  // Trigger SOS manually
  const handleSOS = () => {
    sendSOS(contacts, userLocation);
  };

  // Voice-trigger SOS
  useEffect(() => {
    const recognition = listenForSOS(handleSOS);
    return () => recognition?.stop();
  }, [userLocation, contacts]);

  return (
    <div className="App">
      <Navbar />

      {/* Hero / Landing */}
      <Hero id="home" />

      {/* Features Section */}
      <Features id="features" />

      {/* Safety Map Section */}
      <section id="map" className="section-wrapper">
        <h2 style={{ color: "#fff", marginBottom: "20px" }}>Safety Map</h2>
        <SafetyMap userLocation={userLocation} crimeZones={crimeZones} />
      </section>

      {/* Vehicle Verification Section */}
      <section id="vehicle" className="section-wrapper">
        <h2 style={{ color: "#fff", marginBottom: "20px" }}>Vehicle Verification</h2>
        <VehicleCheck />
      </section>

      {/* Voice-activated SOS */}
      <VoiceSOS triggerSOS={handleSOS} />

      {/* SOS Button */}
      <SOSButton triggerSOS={handleSOS} />

      {/* Contact Section */}
      <Contact id="contact" />
    </div>
  );
}

export default App;