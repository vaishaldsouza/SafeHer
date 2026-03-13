import React, { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, LoadScript, Circle, Marker, InfoWindow } from "@react-google-maps/api";
import crimeData from "../data/crimeZones.json";
import "../styles/map.css";

const mapContainerStyle = { width: "100%", height: "480px" };

const CITY_CENTERS = {
  All:        { lat: 12.9716, lng: 77.5946, zoom: 7  },
  Bangalore:  { lat: 12.9716, lng: 77.5946, zoom: 11 },
  Mangaluru:  { lat: 12.8698, lng: 74.8426, zoom: 12 },
};

const RISK_CONFIG = {
  high:   { color: "#ff1744", label: "High Risk",  glow: "rgba(255,23,68,0.5)"  },
  medium: { color: "#facc15", label: "Moderate",   glow: "rgba(250,204,21,0.5)" },
  low:    { color: "#00e676", label: "Safe Zone",  glow: "rgba(0,230,118,0.5)"  },
};

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function SafetyMap() {
  const [userPos,    setUserPos]    = useState(null);
  const [activeZone, setActiveZone] = useState(null);
  const [alert,      setAlert]      = useState(null);
  const [tracking,   setTracking]   = useState(false);
  const [mapCenter,  setMapCenter]  = useState(CITY_CENTERS.Mangaluru);
  const [mapZoom,    setMapZoom]    = useState(12);
  const [cityFilter, setCityFilter] = useState("Mangaluru");
  const [mapLoaded,  setMapLoaded]  = useState(false);

  const watchRef      = useRef(null);
  const alertShownRef = useRef(new Set());
  const allZones      = crimeData.crimeZones;

  const filteredZones = cityFilter === "All"
    ? allZones
    : allZones.filter(z => z.city === cityFilter);

  /* Switch city view */
  const handleCityChange = (city) => {
    setCityFilter(city);
    setMapCenter(CITY_CENTERS[city]);
    setMapZoom(CITY_CENTERS[city].zoom);
    setActiveZone(null);
  };

  const checkZones = useCallback((lat, lng) => {
    for (const zone of allZones) {
      const dist = getDistance(lat, lng, zone.lat, zone.lng);
      if (dist <= zone.radius) {
        if (!alertShownRef.current.has(zone.id)) {
          alertShownRef.current.add(zone.id);
          setAlert(zone);
          setTimeout(() => setAlert(null), 8000);
        }
        return;
      }
    }
    alertShownRef.current.clear();
  }, [allZones]);

  const startTracking = () => {
    if (!navigator.geolocation) {
      window.alert("Geolocation not supported.");
      return;
    }
    setTracking(true);
    watchRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setUserPos({ lat, lng });
        setMapCenter({ lat, lng });
        checkZones(lat, lng);
      },
      (err) => console.error("Geolocation error:", err),
      { enableHighAccuracy: true, maximumAge: 5000 }
    );
  };

  const stopTracking = () => {
    if (watchRef.current !== null) {
      navigator.geolocation.clearWatch(watchRef.current);
      watchRef.current = null;
    }
    setTracking(false);
    setAlert(null);
    alertShownRef.current.clear();
  };

  useEffect(() => () => {
    if (watchRef.current !== null) navigator.geolocation.clearWatch(watchRef.current);
  }, []);

  return (
    <section id="map" className="map-section">

      <h2>Live Safety Map</h2>
      <p>Crime zones mapped across Bangalore & Mangaluru. Start tracking for real-time alerts.</p>

      {/* CITY FILTER TABS */}
      <div className="city-tabs">
        {["All", "Bangalore", "Mangaluru"].map((city) => (
          <button
            key={city}
            className={`city-tab ${cityFilter === city ? "city-tab-active" : ""}`}
            onClick={() => handleCityChange(city)}
          >
            {city === "All" ? "🗺 All Cities" : city === "Bangalore" ? "🏙 Bangalore" : "🌊 Mangaluru"}
            <span className="city-tab-count">
              {city === "All" ? allZones.length : allZones.filter(z => z.city === city).length}
            </span>
          </button>
        ))}
      </div>

      {/* LEGEND */}
      <div className="map-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "#ff1744", boxShadow: "0 0 8px rgba(255,23,68,0.6)" }} />
          🔴 High Risk
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "#facc15", boxShadow: "0 0 8px rgba(250,204,21,0.6)" }} />
          🟡 Moderate
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "#00e676", boxShadow: "0 0 8px rgba(0,230,118,0.6)" }} />
          🟢 Safe Zone
        </div>
      </div>

      {/* DANGER ALERT BANNER */}
      {alert && (
        <div className={`zone-alert zone-alert-${alert.risk}`}>
          <span className="zone-alert-icon">
            {alert.risk === "high" ? "🚨" : alert.risk === "medium" ? "⚠️" : "ℹ️"}
          </span>
          <div className="zone-alert-text">
            <strong>
              {alert.risk === "high"
                ? "DANGER — Entering " + alert.name
                : alert.risk === "medium"
                ? "Caution — Entering " + alert.name
                : "Notice — Entering " + alert.name}
            </strong>
            <span>{alert.description}</span>
          </div>
          <button className="zone-alert-close" onClick={() => setAlert(null)}>✕</button>
        </div>
      )}

      {/* CONTROLS */}
      <div className="map-controls">
        {!tracking ? (
          <button className="map-locate-btn" onClick={startTracking}>
            📍 Start Live Tracking
          </button>
        ) : (
          <button className="map-stop-btn" onClick={stopTracking}>
            ⏹ Stop Tracking
          </button>
        )}
        {tracking && (
          <span className="tracking-badge">🟢 Live Tracking Active</span>
        )}
      </div>

      {/* GOOGLE MAP */}
      <div className="map-box" style={{ padding: 0, overflow: "hidden" }}>
        <LoadScript
          googleMapsApiKey="AIzaSyDU-zKBsujEnuUyKY9Sf_IW63-a1RQxrBY"
          onLoad={() => setMapLoaded(true)}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={mapZoom}
            options={{ styles: darkMapStyles, zoomControl: true }}
          >
            {filteredZones.map((zone) => (
              <React.Fragment key={zone.id}>
                <Circle
                  center={{ lat: zone.lat, lng: zone.lng }}
                  radius={zone.radius}
                  options={{
                    strokeColor:   RISK_CONFIG[zone.risk].color,
                    strokeOpacity: 0.9,
                    strokeWeight:  2,
                    fillColor:     RISK_CONFIG[zone.risk].color,
                    fillOpacity:   0.2,
                    clickable:     true,
                  }}
                  onClick={() => setActiveZone(zone)}
                />
                {mapLoaded && window.google && (
                  <Marker
                    position={{ lat: zone.lat, lng: zone.lng }}
                    onClick={() => setActiveZone(zone)}
                    icon={{
                      path: window.google.maps.SymbolPath.CIRCLE,
                      scale: 6,
                      fillColor: RISK_CONFIG[zone.risk].color,
                      fillOpacity: 1,
                      strokeColor: "#ffffff",
                      strokeWeight: 2,
                    }}
                  />
                )}
              </React.Fragment>
            ))}

            {activeZone && (
              <InfoWindow
                position={{ lat: activeZone.lat, lng: activeZone.lng }}
                onCloseClick={() => setActiveZone(null)}
              >
                <div className="map-infowindow">
                  <strong>{activeZone.name}</strong>
                  <span className="infowindow-city">📍 {activeZone.city}</span>
                  <span className={`infowindow-badge infowindow-${activeZone.risk}`}>
                    {RISK_CONFIG[activeZone.risk].label}
                  </span>
                  <p>{activeZone.description}</p>
                </div>
              </InfoWindow>
            )}

            {userPos && mapLoaded && window.google && (
              <Marker
                position={userPos}
                title="You are here"
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: "#2979ff",
                  fillOpacity: 1,
                  strokeColor: "#ffffff",
                  strokeWeight: 3,
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      {/* ZONE SUMMARY */}
      <div className="zone-summary">
        {["high", "medium", "low"].map((risk) => {
          const count = filteredZones.filter((z) => z.risk === risk).length;
          return (
            <div key={risk} className={`zone-summary-card zone-summary-${risk}`}>
              <span className="zone-summary-count">{count}</span>
              <span className="zone-summary-label">{RISK_CONFIG[risk].label} Zones</span>
            </div>
          );
        })}
      </div>

    </section>
  );
}

const darkMapStyles = [
  { elementType: "geometry",                              stylers: [{ color: "#0a1628" }] },
  { elementType: "labels.text.stroke",                    stylers: [{ color: "#050a14" }] },
  { elementType: "labels.text.fill",                      stylers: [{ color: "#7b9abd" }] },
  { featureType: "road",         elementType: "geometry",          stylers: [{ color: "#1a2f4a" }] },
  { featureType: "road",         elementType: "geometry.stroke",   stylers: [{ color: "#0d1f38" }] },
  { featureType: "road",         elementType: "labels.text.fill",  stylers: [{ color: "#9ca5b3" }] },
  { featureType: "road.highway", elementType: "geometry",          stylers: [{ color: "#2a4a6e" }] },
  { featureType: "road.highway", elementType: "geometry.stroke",   stylers: [{ color: "#1a3050" }] },
  { featureType: "water",        elementType: "geometry",          stylers: [{ color: "#050a14" }] },
  { featureType: "water",        elementType: "labels.text.fill",  stylers: [{ color: "#515c6d" }] },
  { featureType: "poi",          elementType: "geometry",          stylers: [{ color: "#0d1f38" }] },
  { featureType: "poi.park",     elementType: "geometry",          stylers: [{ color: "#0a2010" }] },
  { featureType: "transit",      elementType: "geometry",          stylers: [{ color: "#0d1f38" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#1a3050" }] },
];

export default SafetyMap;