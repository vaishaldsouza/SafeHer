app.post("/sos", (req, res) => {
  const { location, contacts } = req.body;

  const lat = location.lat;
  const lng = location.lng;

  console.log("SOS Triggered:", lat, lng);

  const message =
`🚨 SOS ALERT!
User is in danger.

Live Location:
https://maps.google.com/?q=${lat},${lng}`;

  smsService.sendSMS(contacts, message);

  res.json({ message: "SOS sent successfully" });
});