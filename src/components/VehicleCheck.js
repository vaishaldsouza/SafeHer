// src/components/VehicleCheck.js
import React, { useState } from "react";
import "../styles/vehicle.css";

function VehicleCheck() {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [status, setStatus] = useState(null);

  const handleCheck = () => {
    // Dummy check logic (replace with API call)
    if (vehicleNumber.trim() === "") {
      setStatus("Please enter a vehicle number");
    } else if (vehicleNumber.toUpperCase().startsWith("KA")) {
      setStatus("✅ Registered vehicle");
    } else {
      setStatus("⚠️ Vehicle not verified");
    }
  };

  return (
    <div className="vehicle-card">
      <h3>Vehicle Verification</h3>
      <p>Check if a taxi or auto is registered for safety</p>
      <input
        type="text"
        placeholder="Enter Vehicle Number"
        value={vehicleNumber}
        onChange={(e) => setVehicleNumber(e.target.value)}
      />
      <button onClick={handleCheck}>Check Vehicle</button>
      {status && <p className="status">{status}</p>}
    </div>
  );
}

export default VehicleCheck;