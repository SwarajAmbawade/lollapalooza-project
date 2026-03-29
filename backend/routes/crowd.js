const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all crowd status
router.get("/", (req, res) => {
    db.query("SELECT * FROM crowd_status", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

// UPDATE status
router.post("/", (req, res) => {
    const { stage, status } = req.body;

    const sql = `
        INSERT INTO crowd_status (stage, status)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE status = ?
    `;

    db.query(sql, [stage, status, status], (err) => {
        if (err) return res.status(500).send(err);
        res.send("Crowd updated");
    });
});

module.exports = router;