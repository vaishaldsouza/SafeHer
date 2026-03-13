import React, { useRef } from "react";
import "../styles/sos.css";

function VoiceSOS({ triggerSOS }) {
  const alertShown = useRef(false); // flag to prevent multiple alerts

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = "en-IN";
    rec.continuous = true;     // keeps listening
    rec.interimResults = true; // detects speech faster

    rec.start();
    console.log("Listening...");

    rec.onresult = (event) => {
      let text = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      text = text.toLowerCase();
      console.log("Detected speech:", text);

      const emergencyWords = [
        "help","help me","save me","emergency",
        "bachao","madad",
        "sahaya","rakshisi",
        "udhavi","kapathu",
        "sahayam","kapadandi",
        "ayuda","aide","hilfe","socorro","aiuto",
        "tasukete","pomogi","dowajuseyo"
      ];

      const detected = emergencyWords.some(word => text.includes(word));

      if (detected && !alertShown.current) {
        alertShown.current = true; // set flag
        alert("🚨 Emergency detected!");
        triggerSOS();
        rec.stop(); // stop recognition
      }
    };

    rec.onerror = (event) => {
      console.log("Voice recognition error:", event.error);
    };

    rec.onend = () => {
      console.log("Voice recognition stopped");
      alertShown.current = false; // reset flag for next time
    };
  };

  return (
    <button className="voice-btn" onClick={startVoice}>
      🎤 Voice SOS
    </button>
  );
}

export default VoiceSOS;