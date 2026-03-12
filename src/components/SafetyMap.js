// src/components/SafetyMap.js
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import mapService from "../services/mapService";
import "../styles/map.css"; // add CSS for map-container

const SafetyMap = () => {
  const [crimeZones, setCrimeZones] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: 12.9716, lng: 77.5946 }); // default location

  // Get user location
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

  // Get crime zones from backend
  useEffect(() => {
    mapService.getCrimeZones().then((zones) => setCrimeZones(zones));
  }, []);

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

          {/* Crime zones */}
          {crimeZones.map((zone, idx) => (
            <Marker
              key={idx}
              position={{ lat: zone.lat, lng: zone.lng }}
              label={zone.type}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default SafetyMap;