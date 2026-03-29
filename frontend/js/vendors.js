function getIcon(category) {
    if (category === "Food") return "🍔";
    if (category === "Drinks") return "🥤";
    if (category === "Merch") return "🛍";
    return "🎪";
}

fetch("http://localhost:5000/api/vendors")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("vendorList");

        data.forEach(v => {
            const card = `
                <div class="vendor-card">
                    <div class="vendor-icon">
                        ${getIcon(v.category)}
                    </div>

                    <h3>${v.name}</h3>

                    <p class="vendor-category">${v.category}</p>
                    <p class="vendor-location">📍 ${v.location}</p>
                </div>
            `;
            container.innerHTML += card;
        });
    });