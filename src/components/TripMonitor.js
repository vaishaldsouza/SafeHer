import React, { useState } from "react";
import "../styles/trip.css";

function TripMonitor() {
  const [tripActive, setTripActive] = useState(false);

  return (
    <section className="trip-monitor">
      <h2>Safe Travel Monitoring</h2>
      {!tripActive ? (
        <button onClick={() => setTripActive(true)}>🚦 Start Safe Trip</button>
      ) : (
        <div className="trip-active">
          <p>🟢 Trip Active</p>
          <button onClick={() => setTripActive(false)}>🛑 End Trip</button>
        </div>
      )}
    </section>
  );
}

export default TripMonitor;