<<<<<<< HEAD
// src/components/SafetyMap.js
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import mapService from "../services/mapService";
import "../styles/map.css"; // make sure this exists

const SafetyMap = () => {
  const [crimeZones, setCrimeZones] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: 12.9716, lng: 77.5946 });
=======
import React, { useState, useEffect, useMemo, useRef } from "react";
import { GoogleMap, LoadScript, Marker, HeatmapLayer } from "@react-google-maps/api";
import { crimePoints } from "../data/crimeData";
import { useTranslation } from "react-i18next";
import "../styles/map.css";

const GOOGLE_MAPS_LIBRARIES = ["visualization", "geometry", "places"];

const SafetyMap = () => {
  const { t } = useTranslation();
  const [userLocation, setUserLocation] = useState({ lat: 12.9716, lng: 77.5946 });
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const mapRef = useRef(null);
>>>>>>> 9f163fe75ea1f4eb1221e3c7af1f64720b28f89f

  // Get user GPS location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(loc);
          if (mapRef.current) {
            mapRef.current.panTo(loc);
          }
        },
        (err) => {
          console.error("Location error:", err);
        }
      );
    }
  }, []);

<<<<<<< HEAD
  // Fetch crime zones from backend
  useEffect(() => {
    mapService.getCrimeZones().then((zones) => setCrimeZones(zones));
  }, []);
=======
  const heatmapData = useMemo(() => {
    if (!scriptLoaded || !window.google) return [];
    return crimePoints.map(p => ({
      location: new window.google.maps.LatLng(p.location.lat, p.location.lng),
      weight: p.weight
    }));
  }, [scriptLoaded]);
>>>>>>> 9f163fe75ea1f4eb1221e3c7af1f64720b28f89f

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
<<<<<<< HEAD
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
=======
    <LoadScript 
      googleMapsApiKey="AIzaSyCumBrG5iOW97AqnegW7xdlL3Mb8-zJDRo" 
      libraries={GOOGLE_MAPS_LIBRARIES}
      onLoad={() => setScriptLoaded(true)}
      loadingElement={<div className="map-loading">Loading Safety Map...</div>}
    >
      <div className="map-wrapper">
        <div className="map-container">
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={userLocation}
            zoom={13}
            onLoad={map => mapRef.current = map}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              mapTypeControl: true,
              streetViewControl: true,
              fullscreenControl: true,
            }}
          >
            <Marker 
              position={userLocation} 
              title="You are here" 
>>>>>>> 9f163fe75ea1f4eb1221e3c7af1f64720b28f89f
            />
            
            {scriptLoaded && heatmapData.length > 0 && (
              <HeatmapLayer
                data={heatmapData}
                options={{ radius: 30, opacity: 0.6 }}
              />
            )}
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
};

export default SafetyMap;