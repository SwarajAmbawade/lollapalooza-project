const bcrypt = require("bcryptjs");

const password = "1234";

bcrypt.hash(password, 10, (err, hash) => {
    console.log("Hashed password:", hash);
});