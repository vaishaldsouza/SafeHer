<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from "react";
import "../styles/sos.css";
import { useTranslation } from "react-i18next";

function VoiceSOS({ triggerSOS }) {
  const { t, i18n } = useTranslation();
  const [isListening, setIsListening] = useState(false);

  const startVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = i18n.language; // Set language to current app language
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const triggerWord = t('sos.trigger').toLowerCase();

      if (transcript.includes(triggerWord)) {
        triggerSOS();
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="voice-sos-container" style={{ textAlign: 'center', margin: '40px 0' }}>
      <button 
        className={`voice-btn ${isListening ? 'listening' : ''}`} 
        onClick={startVoice}
        disabled={isListening}
      >
        <span>{isListening ? '🔵' : '🎤'}</span>
        {isListening ? t('language.listening', 'Listening...') : t('sos.voice')}
      </button>
      
      {isListening && (
        <p className="listening-hint" style={{ color: 'var(--text-secondary)', marginTop: '10px', fontSize: '14px' }}>
          {t('sos.say')} "{t('sos.trigger')}"
        </p>
      )}
    </div>
  );
}
>>>>>>> 9f163fe75ea1f4eb1221e3c7af1f64720b28f89f

export default VoiceSOS;