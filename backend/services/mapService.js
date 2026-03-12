const crimeData = require('../data/crimeData.json');

const getCrimeZones = () => {
  return crimeData;
};

module.exports = { getCrimeZones };