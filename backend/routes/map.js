const express = require('express');
const router = express.Router();
const mapService = require('../services/mapService');

router.get('/crime-zones', (req, res) => {
  res.json(mapService.getCrimeZones());
});

module.exports = router;