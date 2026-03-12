// src/services/mapService.js
const mapService = {
  getCrimeZones: async () => {
    try {
      const res = await fetch("http://localhost:5000/crimezones"); // backend endpoint
      const data = await res.json();
      return data; // array of {lat, lng, type}
    } catch (err) {
      console.log("Error fetching crime zones:", err);
      return [];
    }
  },
};

export default mapService;