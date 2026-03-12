// src/components/VoiceSOS.js
import React, { useEffect } from "react";

const VoiceSOS = ({ triggerSOS }) => {
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log("Voice detected:", transcript);
      if (transcript.includes("help") || transcript.includes("sos")) {
        triggerSOS();
        alert("Voice SOS triggered!");
      }
    };

    recognition.start();
    return () => recognition.stop();
  }, [triggerSOS]);

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <p>Say “Help” to trigger SOS</p>
    </div>
  );
};

export default VoiceSOS;