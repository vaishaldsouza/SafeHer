// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import SafetyMap from "./components/SafetyMap";
import VehicleCheck from "./components/VehicleCheck";
import LiveShare from "./components/LiveShare";
import VoiceSOS from "./components/VoiceSOS";
import SOSButton from "./components/SOSButton";
<<<<<<< HEAD
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
=======
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import TrackingView from "./components/TrackingView";
import { sendSOS } from "./services/sosService";
import { ThemeProvider } from "./context/ThemeContext";
import "./i18n";
import { useTranslation } from "react-i18next";
import "./App.css";

const Dashboard = ({ userLocation, contacts, handleSOS }) => {
  const { t } = useTranslation();
  return (
    <>
      <Hero id="home" />
      <Features id="features" />
      <section id="map" className="section-wrapper">
        <h2 style={{ color: "var(--text-primary)", marginBottom: "20px" }}>{t('sections.map')}</h2>
        <SafetyMap userLocation={userLocation} />
      </section>

      <section id="liveshare" className="section-wrapper">
        <LiveShare userLocation={userLocation} />
      </section>

      <section id="vehicle" className="section-wrapper">
        <h2 style={{ color: "var(--text-primary)", marginBottom: "20px" }}>{t('sections.vehicle')}</h2>
        <VehicleCheck />
      </section>
      <VoiceSOS triggerSOS={handleSOS} />
      <SOSButton triggerSOS={handleSOS} />
    </>
  );
};

function App() {
  const { t } = useTranslation();
  const [userLocation, setUserLocation] = useState({ lat: 12.9716, lng: 77.5946 });
  const [contacts, setContacts] = useState(["+1234567890"]);
>>>>>>> 9f163fe75ea1f4eb1221e3c7af1f64720b28f89f

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

<<<<<<< HEAD
  // Trigger SOS manually
=======
>>>>>>> 9f163fe75ea1f4eb1221e3c7af1f64720b28f89f
  const handleSOS = () => {
    sendSOS(contacts, userLocation);
    alert(t('sos.alert'));
  };

  // Voice-trigger SOS
  useEffect(() => {
    const recognition = listenForSOS(handleSOS);
    return () => recognition?.stop();
  }, [userLocation, contacts]);

  return (
<<<<<<< HEAD
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
=======
    <ThemeProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard userLocation={userLocation} contacts={contacts} handleSOS={handleSOS} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/track/:lat/:lng/:name" element={<TrackingView />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
>>>>>>> 9f163fe75ea1f4eb1221e3c7af1f64720b28f89f
  );
}

export default App;