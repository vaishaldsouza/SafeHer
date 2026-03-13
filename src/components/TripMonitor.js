import React, { useState } from "react";
import "../styles/dashboard.css";

function TripMonitor() {

  const [trip, setTrip] = useState(false);

  return (
    <section id="trip" className="trip-monitor">

      <h2>Trip Monitoring</h2>
      <p>Start monitoring your journey for safety</p>

      <div className="trip-card">

        <div className="trip-status-row">

          <div className="trip-stat">
            <div className="trip-stat-val">
              {trip ? "🟢" : "⚪"}
            </div>
            <div className="trip-stat-label">Status</div>
          </div>

          <div className="trip-divider"></div>

          <div className="trip-stat">
            <div className="trip-stat-val">
              {trip ? "Active" : "Idle"}
            </div>
            <div className="trip-stat-label">Monitoring</div>
          </div>

          <div className="trip-divider"></div>

          <div className="trip-stat">
            <button
              className={`trip-btn ${trip ? "trip-btn-stop" : "trip-btn-start"}`}
              onClick={() => setTrip(!trip)}
            >
              {trip ? "Stop Trip" : "Start Trip"}
            </button>
          </div>

        </div>

        {trip && (
          <p className="trip-active-msg">
            🟢 Trip Monitoring Active — Your location is being tracked.
          </p>
        )}

      </div>

    </section>
  );
}

export default TripMonitor;