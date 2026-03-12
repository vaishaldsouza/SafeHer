import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import "../styles/map.css";

const TrackingView = () => {
  const { lat, lng, name } = useParams();
  const { t } = useTranslation();
  const [position, setPosition] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCumBrG5iOW97AqnegW7xdlL3Mb8-zJDRo",
    libraries: ["visualization", "geometry"],
  });

  useEffect(() => {
    if (lat && lng) {
      setPosition({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      });
    }
  }, [lat, lng]);

  if (!isLoaded || !position) {
    return (
      <div className="auth-container">
        <div className="map-loading">{t('map.loading')}</div>
      </div>
    );
  }

  return (
    <div className="tracking-wrapper" style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <div className="tracking-overlay" style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        right: '20px',
        zIndex: 10,
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(10px)',
        padding: '15px 25px',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'white',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        <h3 style={{ margin: 0, fontSize: '18px', color: '#60a5fa' }}>📍 Tracking {name || 'User'}</h3>
        <p style={{ margin: '5px 0 0', fontSize: '14px', opacity: 0.8 }}>Live Tracking active • SafeHer Security</p>
      </div>

      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={position}
        zoom={15}
        options={{
          styles: [
            { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{"color": "#ffffff"}] },
            { "featureType": "water", "elementType": "geometry", "stylers": [{"color": "#020617"}] }
          ],
          disableDefaultUI: false,
          zoomControl: true,
        }}
      >
        <Marker 
            position={position} 
            animation={window.google?.maps?.Animation?.BOUNCE}
            title="Current Location"
        />
      </GoogleMap>
      
      <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          background: '#ef4444',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '30px',
          fontWeight: 'bold',
          boxShadow: '0 5px 15px rgba(239, 68, 68, 0.4)'
      }}>
          LIVE TRACKING
      </div>
    </div>
  );
};

export default TrackingView;
