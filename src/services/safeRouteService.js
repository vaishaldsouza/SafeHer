// src/services/safeRouteService.js
export const getSafeRoute = async (start, end) => {
  try {
    const res = await fetch(
      `http://localhost:5000/safeRoute?start=${start.lat},${start.lng}&end=${end.lat},${end.lng}`
    );
    const data = await res.json(); // returns route coordinates avoiding unsafe zones
    return data;
  } catch (err) {
    console.error("Failed to get safe route:", err);
    return null;
  }
};