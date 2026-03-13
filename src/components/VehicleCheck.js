import React, { useState } from "react";
import "../styles/vehicle.css";

function VehicleCheck() {

  const [vehicle, setVehicle] = useState("");
  const [result, setResult] = useState("");

  const checkVehicle = () => {
    if (vehicle === "KA01AB1234") {
      setResult("verified");
    } else {
      setResult("notfound");
    }
  };

  return (
    <section id="vehicle" className="vehicle-section">

      <h2>Vehicle Verification</h2>
      <p>Check if a taxi is authentic before starting your trip</p>

      <div className="vehicle-card">

        <div className="vehicle-input-wrap">
          <span className="input-icon">🚗</span>
          <input
            placeholder="Enter vehicle number (e.g. KA01AB1234)"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value.toUpperCase())}
          />
        </div>

        <button onClick={checkVehicle}>
          Check Vehicle
        </button>

        {result === "verified" && (
          <p className="vehicle-result success">
            ✅ Verified Taxi — This vehicle is registered and authentic.
          </p>
        )}

        {result === "notfound" && (
          <p className="vehicle-result error">
            ❌ Vehicle Not Found — This number is not in our records.
          </p>
        )}

        {result === "" && (
          <p className="vehicle-result empty">
            Enter a vehicle number above to verify.
          </p>
        )}

      </div>

    </section>
  );
}

export default VehicleCheck;