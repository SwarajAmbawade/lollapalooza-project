const booking = JSON.parse(localStorage.getItem("bookingData"));

if (!booking) {
    alert("No booking data!");
    window.location.href = "tickets.html";
}

// Show amount
document.getElementById("amount").innerText = "₹" + booking.total_price;

function payNow() {
    // Fake delay (real feel)
    setTimeout(() => {
        alert("Payment Successful ✅");

        // AFTER PAYMENT → CALL BACKEND
        fetch("http://localhost:5000/api/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            // SAVE QR
            localStorage.setItem("qr", data.qr);

            // GO TO SUCCESS PAGE
            window.location.href = "success.html";
        });

    }, 1500);
}