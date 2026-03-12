const fs = require("fs");
const path = require("path");

exports.checkVehicle = (number) => {
  const vehicles = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/vehicles.json"))
  );
  return vehicles.includes(number);
};