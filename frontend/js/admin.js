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

function addVendor() {
    const name = document.getElementById("vendorName").value;
    const category = document.getElementById("vendorCategory").value;
    const location = document.getElementById("vendorLocation").value;

    if (!name || !location) {
        alert("Fill all fields!");
        return;
    }

    fetch("http://localhost:5000/api/vendors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, category, location })
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        location.reload(); // refresh to see update
    })
    .catch(err => console.error(err));
}

function loadVendors() {
    fetch("http://localhost:5000/api/vendors")
        .then(res => res.json())
        .then(data => {
            const table = document.querySelector("#vendorTable tbody");
            table.innerHTML = "";

            data.forEach(v => {
                const row = `
                    <tr>
                        <td>${v.id}</td>
                        <td>${v.name}</td>
                        <td>${v.category}</td>
                        <td>${v.location}</td>
                        <td>
                            <button class="delete-btn" onclick="deleteVendor(${v.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
                table.innerHTML += row;
            });
        });
}

function deleteVendor(id) {
    if (!confirm("Delete this vendor?")) return;

    fetch(`http://localhost:5000/api/vendors/${id}`, {
        method: "DELETE"
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        loadVendors(); // refresh table
    });
}

loadVendors();

function updateCrowd() {
    const stage = document.getElementById("stage").value;
    const status = document.getElementById("status").value;

    fetch("http://localhost:5000/api/crowd", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ stage, status })
    })
    .then(res => res.text())
    .then(msg => alert(msg));
}