import React from "react";
import "../styles/dashboard.css";

function Monitoring() {
  return (
    <section id="monitor" className="monitor">

      <h2>Guardian Monitoring</h2>

      <div className="monitor-cards">

        <div className="monitor-card">
          <span className="monitor-icon">📍</span>
          <div className="monitor-card-title">Live Location</div>
          <div className="monitor-card-desc">
            Continuously tracks your location and shares it with trusted contacts in real time.
          </div>
          <span className="monitor-status active">Active</span>
        </div>

        <div className="monitor-card">
          <span className="monitor-icon">🚗</span>
          <div className="monitor-card-title">Trip Status</div>
          <div className="monitor-card-desc">
            Monitors your trip progress and alerts guardians if you deviate from the safe route.
          </div>
          <span className="monitor-status standby">Standby</span>
        </div>

        <div className="monitor-card">
          <span className="monitor-icon">🚨</span>
          <div className="monitor-card-title">Emergency Alerts</div>
          <div className="monitor-card-desc">
            Instantly notifies your emergency contacts if unusual activity or risk is detected.
          </div>
          <span className="monitor-status active">Active</span>
        </div>

      </div>

    </section>
  );
}

export default Monitoring;