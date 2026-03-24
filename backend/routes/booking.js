const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE BOOKING
router.post("/book", (req, res) => {
    const { name, email, phone, ticket_type, quantity, total_price } = req.body;

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

module.exports = router;