// src/services/shareLocationService.js
export const shareLocation = async (userId, location) => {
  try {
    await fetch("http://localhost:5000/shareLocation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, location }),
    });
  } catch (err) {
    console.error("Failed to share location:", err);
  }
};