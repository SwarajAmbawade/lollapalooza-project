const express = require("express");
const router = express.Router();
const db = require("../db");

// GET vendors
router.get("/", (req, res) => {
    db.query("SELECT * FROM vendors", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

// ADD vendor
router.post("/", (req, res) => {
    const { name, category, location } = req.body;

    const sql = "INSERT INTO vendors (name, category, location) VALUES (?, ?, ?)";

    db.query(sql, [name, category, location], (err) => {
        if (err) return res.status(500).send(err);
        res.send("Vendor added");
    });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM vendors WHERE id = ?";

    db.query(sql, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send("Vendor deleted");
    });
});

module.exports = router;