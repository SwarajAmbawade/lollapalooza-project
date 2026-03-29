const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");
const QRCode = require("qrcode");
const PDFDocument = require("pdfkit");

// CREATE BOOKING
router.post("/book", async (req, res) => {
    const { name, email, phone, ticket_type, quantity, total_price } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).send("Invalid data");
    }

    const ticketData = `
        Name: ${name}
        Ticket: ${ticket_type}
        Qty: ${quantity}
        Total: ₹${total_price}
    `;

    try {
        // 🎟 Generate QR Code (base64)
        const qrCode = await QRCode.toDataURL(ticketData);

        const sql = `
            INSERT INTO bookings (name, email, phone, ticket_type, quantity, total_price)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [name, email, phone, ticket_type, quantity, total_price], (err, result) => {
            if (err) {
                return res.status(500).send("Error saving booking");
            }

            // SEND QR BACK
            res.json({
                message: "Booking successful!",
                qr: qrCode
            });
        });

    } catch (err) {
        res.status(500).send("QR generation failed");
    }
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

// const PDFDocument = require("pdfkit");
// const QRCode = require("qrcode");

router.post("/generate-pdf", async (req, res) => {
    const { name, ticket_type, quantity, total_price } = req.body;

    const doc = new PDFDocument({
        size: "A4",
        margin: 50
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=ticket.pdf");

    doc.pipe(res);

    doc.rect(0, 0, 600, 80).fill("#0f0f0f");

    // 🎨 HEADER
    doc
        .fillColor("white")
        // .fillColor("#ff2e63")
        .fontSize(26)
        .text("Lollapalooza Festival", { align: "center" });

    doc.moveDown(0.5);

    doc
        .fillColor("gray")
        .fontSize(14)
        .text("Official Entry Ticket", { align: "center" });

    doc.moveDown(2);

    // 🎟 TICKET BOX
    doc
        .roundedRect(50, 150, 500, 250, 10)
        .stroke("#ff2e63");

    // 🧾 DETAILS
    doc
        .fillColor("black")
        .fontSize(14)
        .text(`Name: ${name}`, 70, 180)
        .text(`Ticket Type: ${ticket_type}`, 70, 210)
        .text(`Quantity: ${quantity}`, 70, 240)
        .text(`Total: ₹${total_price}`, 70, 270);

    // 🎟 TICKET ID (random)
    const ticketId = "LLA-" + Math.floor(Math.random() * 100000);

    doc
        .fontSize(12)
        .fillColor("gray")
        .text(`Ticket ID: ${ticketId}`, 70, 310);

    // 🎯 QR DATA
    const qrData = `
        ${name}
        ${ticket_type}
        ${quantity}
        ${total_price}
        ${ticketId}
    `;

    // 🔲 GENERATE QR
    const qrImage = await QRCode.toDataURL(qrData);

    // Convert base64 → buffer
    const qrBuffer = Buffer.from(qrImage.split(",")[1], "base64");

    // 📍 PLACE QR
    doc.image(qrBuffer, 380, 180, { width: 120 });

    // 📝 FOOTER
    doc.moveDown(4);

    doc
        .fontSize(12)
        .fillColor("gray")
        .text("Show this ticket at entry gate", { align: "center" });

    doc
        .text("Do not share this QR code with others", { align: "center" });

    doc.end();
});

module.exports = router;