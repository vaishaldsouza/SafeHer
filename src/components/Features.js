import React from "react";
import "../styles/features.css";

const featuresData = [
  { title: "SOS Panic Button", color: "red", description: "Instantly alert your trusted contacts." },
  { title: "Voice Trigger SOS", color: "red", description: "Say 'Help' to send emergency alert." },
  { title: "Offline Emergency SMS", color: "green", description: "Send SOS even without internet." },
  { title: "GPS Location Detection", color: "green", description: "Real-time location tracking." },
  { title: "Safe Route Navigation", color: "blue", description: "Avoid crime-prone areas." },
  { title: "Crime Zone Alerts", color: "blue", description: "Get notified entering unsafe zones." },
  { title: "Vehicle Verification", color: "blue", description: "Check if a taxi/auto is registered." },
  { title: "Live Location Sharing", color: "purple", description: "Share travel with trusted contacts." },
];

function Features() {
  const handleClick = (title) => {
    alert(`Feature clicked: ${title}`);
  };

  return (
    <section className="features-section" id="features">
      <h2>SafeHer Features</h2>
      <div
        className="features-grid"
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }} // Force 4 cards per row
      >
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className={`feature-card ${feature.color}`}
            onClick={() => handleClick(feature.title)}
            tabIndex={0}
          >
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;