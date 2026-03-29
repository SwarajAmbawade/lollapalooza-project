const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const vendorRoutes = require("./routes/vendor");
const bookingRoutes = require("./routes/booking");
const authRoutes = require("./routes/auth");
const crowdRoutes = require("./routes/crowd");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("frontend"));

// ROUTES
app.use("/api", bookingRoutes);
app.use("/api", authRoutes);

app.use("/api/vendors", vendorRoutes);

app.use("/api/crowd", crowdRoutes);

// SERVER START
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});