const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const bookingRoutes = require("./routes/booking");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("frontend"));

// ROUTES
app.use("/api", bookingRoutes);

// SERVER START
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});