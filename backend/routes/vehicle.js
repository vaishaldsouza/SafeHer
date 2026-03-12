const express = require("express");
const router = express.Router();
const vehicles = require("../data/vehicles.json");

// GET /vehicle/:number
router.get("/:number", (req, res) => {
  const number = req.params.number.toUpperCase();
  const vehicle = vehicles.find(v => v.number === number);
  if(vehicle) return res.json(vehicle);
  res.json({ registered: false });
});

module.exports = router;