let selectedPrice = 0;
let selectedName = "None";
let qty = 1;

function selectTicket(element, price) {
    document.querySelectorAll(".ticket-card").forEach(card => {
        card.classList.remove("active");
    });

    element.classList.add("active");

    selectedPrice = price;
    selectedName = element.querySelector("h3").innerText;

    updateSummary();
}

function changeQty(change) {
    qty += change;
    if (qty < 1) qty = 1;

    document.getElementById("qty").innerText = qty;
    updateSummary();
}

function updateSummary() {
    document.getElementById("ticketName").innerText = selectedName;
    document.getElementById("ticketPrice").innerText = selectedPrice;
    document.getElementById("ticketQty").innerText = qty;
    document.getElementById("total").innerText = selectedPrice * qty;
}




function bookTicket() {
    const name = document.querySelector("input[type='text']").value;
    const email = document.querySelector("input[type='email']").value;
    const phone = document.querySelector("input[type='tel']").value;

    if (!name || !email || !phone || selectedPrice === 0) {
        alert("Fill all details!");
        return;
    }

    const data = {
        name,
        email,
        phone,
        ticket_type: selectedName,
        quantity: qty,
        total_price: selectedPrice * qty
    };

    // SAVE TEMP (for payment page)
    localStorage.setItem("bookingData", JSON.stringify(data));

    // REDIRECT
    window.location.href = "payment.html";
}