// src/services/mapService.js
const mapService = {
  getCrimeZones: async () => {
    try {
      const res = await fetch("http://localhost:5000/crimeZones");
      const data = await res.json(); // [{lat, lng, type}, ...]
      return data;
    } catch (err) {
      console.error("Failed to fetch crime zones:", err);
      return [];
    }
  },
};

export default mapService;