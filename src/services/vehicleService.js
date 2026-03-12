export const checkVehicle = async (vehicleNumber) => {
  const res = await fetch("http://localhost:5000/vehicle", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vehicleNumber }),
  });
  return res.json();
};