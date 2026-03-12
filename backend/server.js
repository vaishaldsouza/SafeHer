const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const smsService = require("./services/smsService");
const vehicleService = require("./services/vehicleService");
const contactsService = require("./services/contactsService");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

// SOS Endpoint
app.post("/sos", (req, res) => {
  const { lat, lng, contacts } = req.body;
  console.log("SOS Triggered:", lat, lng, contacts);
  smsService.sendSMS(contacts, `SOS! Location: ${lat}, ${lng}`);
  res.json({ message: "SOS sent successfully" });
});

// Vehicle Verification
app.post("/vehicle", (req, res) => {
  const { vehicleNumber } = req.body;
  const safe = vehicleService.checkVehicle(vehicleNumber);
  res.json({ safe });
});

// Crime Zones
app.get("/crimezones", (req, res) => {
  const crimeData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data/crimezones.json"))
  );
  res.json(crimeData);
});

// Contacts
app.get("/contacts", (req, res) => {
  res.json(contactsService.getContacts());
});

app.post("/contacts", (req, res) => {
  const { name, phone } = req.body;
  contactsService.addContact(name, phone);
  res.json({ message: "Contact added" });
});

app.delete("/contacts/:phone", (req, res) => {
  contactsService.removeContact(req.params.phone);
  res.json({ message: "Contact removed" });
});

// Location Tracking
app.post("/track", (req, res) => {
  const { userId, lat, lng } = req.body;
  console.log(`User ${userId} location: ${lat}, ${lng}`);
  res.json({ message: "Location updated" });
});

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));