const SERVER_URL = "http://localhost:5000";

export const sendSOSToServer = async ({ userName, contacts, location }) => {
  console.log("📡 Sending SOS to server...", { userName, contacts, location });

  try {
    const res = await fetch(`${SERVER_URL}/sos`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ userName, contacts, location }),
    });

    const data = await res.json();
    console.log("✅ Server response:", data);
    return { success: true, results: data.results };

  } catch (err) {
    console.error("❌ SOS fetch error:", err.message);
    return { success: false, error: err.message };
  }
};

export const shareLocation = async (userId, location) => {
  try {
    await fetch(`${SERVER_URL}/track`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ userId, lat: location.lat, lng: location.lng }),
    });
  } catch (err) {
    console.error("Location sharing failed:", err);
  }
};

export const generateLocationLink = (lat, lng) => {
  return `https://maps.google.com/?q=${lat},${lng}`;
};