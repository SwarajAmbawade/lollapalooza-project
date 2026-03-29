const express = require("express");
const router = express.Router();

const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM admin WHERE username = ?";

    db.query(sql, [username], async (err, result) => {
        if (err) return res.status(500).send("Server error");

        if (result.length === 0) {
            return res.status(401).send("Invalid credentials");
        }

        const admin = result[0];

        // 🔐 Compare hashed password
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).send("Invalid credentials");
        }

        const token = jwt.sign({ id: admin.id }, "secretkey", {
            expiresIn: "1h"
        });

        res.json({ token });
    });
});

module.exports = router;