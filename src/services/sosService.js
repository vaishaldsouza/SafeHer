// src/services/sosService.js
export const sendSOS = async (contacts, location) => {
  const payload = { contacts, lat: location.lat, lng: location.lng };

  try {
    const response = await fetch("http://localhost:5000/sos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log("SOS sent:", await response.json());
  } catch (error) {
    // Offline: store in LocalStorage
    console.log("Offline: storing SOS");
    let pendingSOS = JSON.parse(localStorage.getItem("pendingSOS")) || [];
    pendingSOS.push(payload);
    localStorage.setItem("pendingSOS", JSON.stringify(pendingSOS));
  }
};