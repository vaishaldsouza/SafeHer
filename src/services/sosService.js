export const sendSOS = async (contacts, location) => {
  try {
    const response = await fetch("http://localhost:5000/sos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        lat: location.lat,
        lng: location.lng,
        contacts: contacts
      })
    });

    const data = await response.json();
    alert(data.message);

  } catch (err) {
    console.error("SOS error:", err);
  }
};