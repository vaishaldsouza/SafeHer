// src/data/crimeData.js
// Spatial crime data for Karnataka Districts
// Coordinates for 31 districts to provide a comprehensive state-wide heatmap
export const crimePoints = [
  { location: { lat: 12.9716, lng: 77.5946 }, weight: 10, name: "Bengaluru City" },
  { location: { lat: 13.0184, lng: 77.5734 }, weight: 8, name: "Bengaluru Rural" },
  { location: { lat: 12.3072, lng: 76.6413 }, weight: 7, name: "Mysuru" },
  { location: { lat: 15.3647, lng: 75.1240 }, weight: 9, name: "Hubballi-Dharwad" },
  { location: { lat: 15.8497, lng: 74.4977 }, weight: 6, name: "Belagavi" },
  { location: { lat: 12.9141, lng: 74.8560 }, weight: 7, name: "Mangaluru" },
  { location: { lat: 17.3297, lng: 76.8343 }, weight: 8, name: "Kalaburagi" },
  { location: { lat: 14.4674, lng: 75.9213 }, weight: 5, name: "Davanagere" },
  { location: { lat: 13.3409, lng: 74.7421 }, weight: 4, name: "Udupi" },
  { location: { lat: 15.1394, lng: 76.9214 }, weight: 6, name: "Ballari" },
  { location: { lat: 13.9299, lng: 75.5681 }, weight: 5, name: "Shivamogga" },
  { location: { lat: 12.5218, lng: 76.8951 }, weight: 4, name: "Mandya" },
  { location: { lat: 13.1328, lng: 78.1292 }, weight: 4, name: "Kolar" },
  { location: { lat: 13.3392, lng: 77.1140 }, weight: 5, name: "Tumakuru" },
  { location: { lat: 13.1007, lng: 77.5963 }, weight: 3, name: "Chikballapur" },
  { location: { lat: 14.2251, lng: 76.3980 }, weight: 4, name: "Chitradurga" },
  { location: { lat: 13.2045, lng: 75.9928 }, weight: 3, name: "Hassan" },
  { location: { lat: 13.3153, lng: 75.7754 }, weight: 3, name: "Chikkamagaluru" },
  { location: { lat: 12.4244, lng: 75.7382 }, weight: 2, name: "Kodagu" },
  { location: { lat: 12.1264, lng: 76.9388 }, weight: 3, name: "Chamarajanagar" },
  { location: { lat: 14.6214, lng: 74.8424 }, weight: 4, name: "Uttara Kannada" },
  { location: { lat: 14.7936, lng: 75.4037 }, weight: 3, name: "Haveri" },
  { location: { lat: 15.4419, lng: 75.7117 }, weight: 3, name: "Gadag" },
  { location: { lat: 15.3486, lng: 76.1555 }, weight: 4, name: "Koppal" },
  { location: { lat: 16.1691, lng: 75.6615 }, weight: 5, name: "Bagalkote" },
  { location: { lat: 16.8302, lng: 75.7100 }, weight: 6, name: "Vijayapura" },
  { location: { lat: 16.2120, lng: 77.3439 }, weight: 5, name: "Raichur" },
  { location: { lat: 16.7645, lng: 77.1332 }, weight: 4, name: "Yadgir" },
  { location: { lat: 17.9104, lng: 77.5199 }, weight: 4, name: "Bidar" },
  { location: { lat: 15.2750, lng: 76.3920 }, weight: 5, name: "Vijayanagara" },
  { location: { lat: 12.9120, lng: 74.9650 }, weight: 9, name: "Canara Engineering Area - High Risk" },
  { location: { lat: 12.8700, lng: 74.8800 }, weight: 8, name: "Mangalore Downtown" },
  { location: { lat: 12.9300, lng: 74.9000 }, weight: 4, name: "Surathkal Area" },
];

export const getSafetyScore = (lat, lng) => {
  let risk = 0;
  crimePoints.forEach(point => {
    // Distance in degrees (approximate)
    const dist = Math.sqrt(Math.pow(lat - point.location.lat, 2) + Math.pow(lng - point.location.lng, 2));
    if (dist < 0.1) { // within ~10km
      risk += point.weight * (1 - dist / 0.1);
    }
  });
  return Math.max(0, 100 - risk * 5);
};
