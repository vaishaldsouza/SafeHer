import React, { useState } from "react";
import "../styles/features.css";

const features = [
  { title: "SOS Emergency",         desc: "Instant panic alert to contacts",   color: "red",    action: "sos"      },
  { title: "Voice SOS",             desc: "Say HELP to activate emergency",     color: "red",    action: "voice"    },
  { title: "Offline Emergency SMS",  desc: "Works without internet",            color: "green",  action: "offline"  },
  { title: "GPS Location Detection", desc: "Detect user location",              color: "green",  action: "gps"      },
  { title: "Safe Route Navigation",  desc: "Avoid risky areas",                 color: "blue",   action: "route"    },
  { title: "Crime Zone Alerts",      desc: "Warn when entering danger area",    color: "blue",   action: "crime"    },
  { title: "Vehicle Verification",   desc: "Check taxi authenticity",           color: "purple", action: "vehicle"  },
  { title: "Live Location Sharing",  desc: "Share location with contacts",      color: "purple", action: "location" },
];

function Features({ triggerSOS, triggerVoice }) {

  const [popup, setPopup] = useState(null);

  const handleClick = (action) => {
    switch (action) {

      case "sos":
        triggerSOS();
        break;

      case "voice":
        triggerVoice();
        break;

      case "gps":
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              setPopup({
                title: "📍 GPS Location Detected",
                message: `Latitude: ${pos.coords.latitude.toFixed(4)}\nLongitude: ${pos.coords.longitude.toFixed(4)}`,
              });
            },
            () => setPopup({ title: "📍 GPS", message: "Unable to fetch location. Please allow location access." })
          );
        }
        break;

      case "route":
        document.getElementById("map")?.scrollIntoView({ behavior: "smooth" });
        break;

      case "crime":
        document.getElementById("map")?.scrollIntoView({ behavior: "smooth" });
        setPopup({
          title: "⚠️ Crime Zone Alerts",
          message: "Scanning your area for crime zones...\n\n🔴 2 high-risk zones detected nearby!\nStay on main roads and avoid dark alleys.",
        });
        break;

      case "vehicle":
        document.getElementById("vehicle")?.scrollIntoView({ behavior: "smooth" });
        break;

      case "offline":
        setPopup({
          title: "📵 Offline Emergency SMS",
          message: "Demo: Sending emergency SMS to your saved contacts...\n\n✅ SMS sent to:\n• Mom: +91 98765 XXXXX\n• Friend: +91 91234 XXXXX\n\nMessage: 'I need help! My last location: [GPS coords]'",
        });
        break;

      case "location":
        setPopup({
          title: "📡 Live Location Sharing",
          message: "Demo: Sharing your live location...\n\n✅ Location link sent to:\n• Mom\n• Best Friend\n\nThey can track you for the next 30 minutes.",
        });
        break;

      default:
        break;
    }
  };

  return (
    <>
      <section id="features" className="features">
        {features.map((f, i) => (
          <div
            key={i}
            className={`feature-card ${f.color}`}
            onClick={() => handleClick(f.action)}
          >
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
            <span className="card-cta">Tap to activate →</span>
          </div>
        ))}
      </section>

      {/* Popup Modal */}
      {popup && (
        <div className="feature-popup-overlay" onClick={() => setPopup(null)}>
          <div className="feature-popup" onClick={(e) => e.stopPropagation()}>
            <h3>{popup.title}</h3>
            <p style={{ whiteSpace: "pre-line" }}>{popup.message}</p>
            <button className="popup-close-btn" onClick={() => setPopup(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Features;