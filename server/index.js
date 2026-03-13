const express = require("express");
const cors    = require("cors");
const twilio  = require("twilio");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("🔑 Twilio SID:", process.env.TWILIO_ACCOUNT_SID ? "✅ Found" : "❌ Missing");
console.log("🔑 Twilio Token:", process.env.TWILIO_AUTH_TOKEN ? "✅ Found" : "❌ Missing");
console.log("📞 Twilio Phone:", process.env.TWILIO_PHONE_NUMBER ? "✅ Found" : "❌ Missing");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const locationStore = {};

/* ── POST /sos ── */
app.post("/sos", async (req, res) => {
  console.log("\n🚨 SOS request received!");
  console.log("Body:", JSON.stringify(req.body, null, 2));

  const { userName, contacts, location } = req.body;

  if (!contacts || contacts.length === 0) {
    console.log("❌ No contacts provided");
    return res.status(400).json({ error: "No contacts provided" });
  }

  const mapsLink = `https://maps.google.com/?q=${location?.lat || 0},${location?.lng || 0}`;

  const message =
    `🚨 EMERGENCY ALERT 🚨\n` +
    `${userName || "Someone"} needs help right now!\n` +
    `📍 Live Location: ${mapsLink}\n` +
    `Please call them or contact authorities immediately.\n` +
    `— SafeHer App`;

  console.log("📨 Sending to", contacts.length, "contact(s)...");

  const results = [];

  for (const contact of contacts) {
    console.log(`📲 Sending to ${contact.name} at ${contact.phone}...`);
    try {
      const sent = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to:   contact.phone,
      });
      console.log(`✅ Sent to ${contact.name} — SID: ${sent.sid}`);
      results.push({ name: contact.name, status: "sent", sid: sent.sid });
    } catch (err) {
      console.log(`❌ Failed to send to ${contact.name}:`, err.message);
      results.push({ name: contact.name, status: "failed", error: err.message });
    }
  }

  return res.json({ success: true, results });
});

/* ── POST /track ── */
app.post("/track", (req, res) => {
  const { userId, lat, lng } = req.body;
  locationStore[userId] = { lat, lng, updatedAt: new Date().toISOString() };
  return res.json({ success: true });
});

/* ── GET /track/:userId ── */
app.get("/track/:userId", (req, res) => {
  const data = locationStore[req.params.userId];
  if (!data) return res.status(404).json({ error: "User not found" });
  return res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ SafeHer server running on http://localhost:${PORT}`);
});