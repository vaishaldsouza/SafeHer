// src/services/notificationService.js
export const checkUnsafeZone = (userLocation, crimeZones) => {
  const unsafeZone = crimeZones.find(zone => {
    const distance = Math.sqrt(
      Math.pow(userLocation.lat - zone.lat, 2) + Math.pow(userLocation.lng - zone.lng, 2)
    );
    return distance < 0.005; // ~500 meters threshold
  });
  if (unsafeZone) {
    alert(`Warning: You are entering an unsafe zone (${unsafeZone.type})`);
  }
};