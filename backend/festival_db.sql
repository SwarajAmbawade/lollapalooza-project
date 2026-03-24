CREATE DATABASE festival_db;

USE festival_db;

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15),
    ticket_type VARCHAR(50),
    quantity INT,
    total_price INT
);