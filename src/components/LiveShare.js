import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/liveshare.css";

const LiveShare = ({ userLocation }) => {
  const { t } = useTranslation();
  const [isSharing, setIsSharing] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    // Generate an internal SafeHer tracking link
    const { lat, lng } = userLocation;
    const userData = JSON.parse(localStorage.getItem("user")) || { name: "User" };
    const userName = encodeURIComponent(userData.name || "User");
    const baseUrl = window.location.origin;
    const trackingLink = `${baseUrl}/track/${lat}/${lng}/${userName}`;
    setShareLink(trackingLink);
  }, [userLocation]);

  const toggleSharing = () => {
    setIsSharing(!isSharing);
    if (!isSharing) {
        // Here you would typically start a background service or interval to update DB
        console.log("Started live location updates for:", userLocation);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${t('liveshare.msg')} ${shareLink}`);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`${t('liveshare.msg')} ${shareLink}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="liveshare-card">
      <div className="liveshare-header">
        <div className="icon-badge">
          <span className={`status-dot ${isSharing ? "active" : ""}`}></span>
          📍
        </div>
        <div className="header-text">
          <h3>{t('liveshare.title')}</h3>
          <p>{t('liveshare.subtitle')}</p>
        </div>
      </div>

      <div className="liveshare-content">
        <div className={`status-banner ${isSharing ? "on" : "off"}`}>
            {isSharing ? t('liveshare.active') : t('liveshare.inactive')}
        </div>

        <div className="action-area">
          <button 
            className={`main-share-btn ${isSharing ? "stop" : "start"}`}
            onClick={toggleSharing}
          >
            {isSharing ? t('liveshare.stop') : t('liveshare.start')}
          </button>
        </div>

        {isSharing && (
          <div className="sharing-options">
            <div className="link-display">
                <input type="text" readOnly value={shareLink} />
                <button onClick={copyToClipboard} className="copy-btn">
                    {copySuccess ? "✓" : t('liveshare.copy')}
                </button>
            </div>
            
            <div className="social-grid">
                <button className="social-btn whatsapp" onClick={shareViaWhatsApp}>
                    WhatsApp
                </button>
                <button className="social-btn sms" onClick={() => window.location.href = `sms:?body=${encodeURIComponent(t('liveshare.msg') + shareLink)}`}>
                    SMS
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveShare;
