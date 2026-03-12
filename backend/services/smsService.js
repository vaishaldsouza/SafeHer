const twilio = require("twilio");

const accountSid = "TWILIO_ACCOUNT_SID";
const authToken = "35a5895de37cf4d75359298dd7a3db10";

const client = new twilio(accountSid, authToken);

exports.sendSMS = async (contacts, message) => {
  console.log("Sending SOS message...");

  for (let number of contacts) {
    try {
      const msg = await client.messages.create({
        body: message,
        from: "+17196527013", // Twilio phone number
        to: number
      });

      console.log("SMS sent:", msg.sid);
    } catch (error) {
      console.log("Error sending SMS:", error.message);
    }
  }
};