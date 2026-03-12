// src/components/SafetyMap.js
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import mapService from "../services/mapService";
import "../styles/map.css"; // make sure this exists

const SafetyMap = () => {
  const [crimeZones, setCrimeZones] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: 12.9716, lng: 77.5946 });

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

  // Fetch crime zones from backend
  useEffect(() => {
    mapService.getCrimeZones().then((zones) => setCrimeZones(zones));
  }, []);

  // Assign color based on crime type/severity
  const getMarkerColor = (type) => {
    if (type.toLowerCase().includes("murder") || type.toLowerCase().includes("assault")) {
      return "red";
    } else if (type.toLowerCase().includes("robbery") || type.toLowerCase().includes("burglary")) {
      return "orange";
    } else {
      return "blue"; // Theft, Cyber Crime, minor offenses
    }
  };

  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey="AIzaSyCumBrG5iOW97AqnegW7xdlL3Mb8-zJDRo">
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={userLocation}
          zoom={13}
        >
          {/* User location */}
          <Marker position={userLocation} label="You" />

          {/* Crime zones with color-coded labels */}
          {crimeZones.map((zone, idx) => (
            <Marker
              key={idx}
              position={{ lat: zone.lat, lng: zone.lng }}
              label={{
                text: zone.type,
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
              }}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: getMarkerColor(zone.type),
                fillOpacity: 0.8,
                strokeWeight: 0,
                scale: 12,
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default SafetyMap;