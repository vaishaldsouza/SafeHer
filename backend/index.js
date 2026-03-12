// safeher-backend/index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sosRoutes = require("./routes/sos");
const vehicleRoutes = require("./routes/vehicle");
const mapRoutes = require("./routes/map");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/sos", sosRoutes);
app.use("/vehicle", vehicleRoutes);
app.use("/map", mapRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));