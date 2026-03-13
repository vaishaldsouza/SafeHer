import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";

function NetworkStatus() {

  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {

    const update = () => setOnline(navigator.onLine);

    window.addEventListener("online", update);
    window.addEventListener("offline", update);

    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };

  }, []);

  return (
    <div className={`network-status ${online ? "online" : "offline"}`}>
      {online ? "Online" : "Offline"}
    </div>
  );
}

export default NetworkStatus;