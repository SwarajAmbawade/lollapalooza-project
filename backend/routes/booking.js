const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

// CREATE BOOKING
router.post("/book", (req, res) => {
    const { name, email, phone, ticket_type, quantity, total_price } = req.body;

    // ✅ VALIDATION (THIS FIXES NULL ISSUE)
    if (!name || !email || !phone || !ticket_type || !quantity || !total_price) {
        return res.status(400).send("Invalid or missing data");
    }

    const sql = `
        INSERT INTO bookings (name, email, phone, ticket_type, quantity, total_price)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, email, phone, ticket_type, quantity, total_price], (err, result) => {
        if (err) {
            res.status(500).send("Error saving booking");
        } else {
            res.send("Booking successful!");
        }
    });
});

// GET ALL BOOKINGS
// GET BOOKINGS (PROTECTED)
router.get("/bookings", auth, (req, res) => {
    const sql = "SELECT * FROM bookings ORDER BY id DESC";

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Error fetching bookings");
        } else {
            res.json(result);
        }
    });
});

module.exports = router;