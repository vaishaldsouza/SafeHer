// src/components/VehicleCheck.js
import React, { useState } from "react";
import "../styles/vehicle.css";
import { useTranslation } from "react-i18next";

function VehicleCheck() {
  const { t } = useTranslation();
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [status, setStatus] = useState(null);

  const handleCheck = () => {
    if (vehicleNumber.trim() === "") {
      setStatus(t('vehicle.status.empty'));
    } else if (vehicleNumber.toUpperCase().startsWith("KA")) {
      setStatus(t('vehicle.status.registered'));
    } else {
      setStatus(t('vehicle.status.unverified'));
    }
  };

  return (
    <div className="vehicle-card">
      <h3>{t('vehicle.title')}</h3>
      <p>{t('vehicle.subtitle')}</p>
      <input
        type="text"
        placeholder={t('vehicle.placeholder')}
        value={vehicleNumber}
        onChange={(e) => setVehicleNumber(e.target.value)}
      />
      <button onClick={handleCheck}>{t('vehicle.button')}</button>
      {status && <p className="status">{status}</p>}
    </div>
  );
}

export default VehicleCheck;