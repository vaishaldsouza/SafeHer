import React from "react";
import "../styles/sos.css";

function SOSButton({ triggerSOS }) {
  return (
    <div id="sos" className="sos-section">

      <h2>Emergency SOS</h2>

      <button className="sos-button" onClick={triggerSOS}>
        🚨 SOS
      </button>

      <p>Press this button in case of emergency.</p>

    </div>
  );
}

export default SOSButton;