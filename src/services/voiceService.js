// src/services/voiceService.js
export const listenForSOS = (triggerCallback) => {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Voice recognition not supported");
    return;
  }

  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
    if (transcript.includes("help")) {
      triggerCallback();
    }
  };

  recognition.onerror = (err) => console.log("Voice recognition error:", err);
  recognition.start();

  return recognition;
};