function loadCrowd() {
    fetch("http://localhost:5000/api/crowd")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("crowdBars");

            if (!container) {
                console.error("crowdBars not found");
                return;
            }

            container.innerHTML = "";

            data.forEach(c => {
                let status = c.status.toLowerCase();

                let width = "30%";
                let color = "#00ff88"; // green

                if (status === "medium") {
                    width = "60%";
                    color = "#ffc107"; // yellow
                }

                if (status === "high") {
                    width = "100%";
                    color = "#ff2e63"; // red
                }

                container.innerHTML += `
                    <div class="crowd-item">
                        <p>${c.stage}</p>
                        <div class="bar-bg">
                            <div class="bar-fill" style="width:${width}; background:${color};"></div>
                        </div>
                    </div>
                `;
            });
        })
        .catch(err => console.error("Crowd fetch error:", err));
}

// 🔄 Auto refresh every 3 sec
setInterval(loadCrowd, 3000);

// 🚀 Initial load
loadCrowd();