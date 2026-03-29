// CHECK LOGIN
const token = localStorage.getItem("token");

if (!token) {
    alert("Unauthorized!");
    window.location.href = "admin-login.html";
}


let bookingsData = [];

fetch("http://localhost:5000/api/bookings", {
    headers: {
        "Authorization": token
    }
})

function logout() {
    localStorage.removeItem("token");
    window.location.href = "admin-login.html";
}

function renderTable(data) {
    const table = document.getElementById("bookingTable");
    table.innerHTML = "";

    data.forEach(b => {
        const row = `
            <tr>
                <td>${b.id}</td>
                <td>${b.name || "-"}</td>
                <td>${b.email || "-"}</td>
                <td>${b.phone || "-"}</td>
                <td>
                    <span class="badge ${b.ticket_type === 'VIP' ? 'vip' : 'normal'}">
                        ${b.ticket_type || "-"}
                    </span>
                </td>
                <td>${b.quantity || "-"}</td>
                <td>₹${b.total_price || 0}</td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

/* SEARCH */
document.getElementById("searchInput").addEventListener("input", function () {
    applyFilters();
});

/* FILTER */
document.getElementById("filterTicket").addEventListener("change", function () {
    applyFilters();
});

function applyFilters() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const filter = document.getElementById("filterTicket").value;

    let filtered = bookingsData.filter(b => {
        const matchName = (b.name || "").toLowerCase().includes(search);
        const matchTicket = filter === "" || b.ticket_type === filter;

        return matchName && matchTicket;
    });

    renderTable(filtered);
}