function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => {
        if (!res.ok) throw new Error("Login failed");
        return res.json();
    })
    .then(data => {
        // SAVE TOKEN
        localStorage.setItem("token", data.token);

        // REDIRECT
        window.location.href = "admin.html";
    })
    .catch(() => {
        alert("Invalid credentials");
    });
}