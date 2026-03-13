/* ─────────────────────────────────────────
   notificationService.js
   Checks if user is inside any crime zone
   Uses Haversine formula for accurate GPS distance
───────────────────────────────────────── */

const EARTH_RADIUS_M = 6371000;

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

/* Returns distance in metres between two GPS points */
function haversineDistance(lat1, lng1, lat2, lng2) {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_M * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/*
  checkUnsafeZone
  ---------------
  userLocation : { lat, lng }
  crimeZones   : array of zone objects from crimeZones.json
  onAlert      : callback(zone) — called when user enters a zone
                 (instead of alert() so UI can show a nice banner)

  Returns the matched zone object or null
*/
export const checkUnsafeZone = (userLocation, crimeZones, onAlert) => {
  for (const zone of crimeZones) {
    const dist = haversineDistance(
      userLocation.lat,
      userLocation.lng,
      zone.lat,
      zone.lng
    );

    if (dist <= zone.radius) {
      if (typeof onAlert === "function") {
        onAlert(zone);
      } else {
        /* Fallback if no callback passed */
        const emoji = zone.risk === "high" ? "🚨" : zone.risk === "medium" ? "⚠️" : "ℹ️";
        alert(`${emoji} Warning: Entering ${zone.name} — ${zone.description}`);
      }
      return zone;
    }
  }
  return null;
};

/*
  requestNotificationPermission
  --------------------------------
  Call once on app load to enable browser push notifications
*/
export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) return false;
  const permission = await Notification.requestPermission();
  return permission === "granted";
};

/*
  showPushNotification
  ----------------------
  Shows a browser push notification for zone alerts
*/
export const showPushNotification = (zone) => {
  if (Notification.permission !== "granted") return;

  const emoji = zone.risk === "high" ? "🚨" : zone.risk === "medium" ? "⚠️" : "ℹ️";

  new Notification(`${emoji} SafeHer Zone Alert`, {
    body: `You are entering ${zone.name}. ${zone.description}`,
    icon: "/logo192.png",
    badge: "/logo192.png",
    vibrate: zone.risk === "high" ? [300, 100, 300] : [200],
  });
};