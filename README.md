# 🎵 Lollapalooza Festival Management System

## 📌 Overview

The **Lollapalooza Festival Management System** is a full-stack web application designed to manage festival operations including ticket booking, vendor management, and live crowd monitoring.

This project simulates a real-world event management platform with features such as QR-based ticketing, admin dashboard control, and dynamic crowd visualization.

---

## 🚀 Features

### 🎟 Ticket Booking System

* Users can book tickets online
* Generates **QR-based digital tickets**
* Download ticket as **PDF**
* Stores booking details in database

### 🔐 Admin Dashboard

* Secure admin login system
* View all bookings in structured table
* Manage vendors (Add/Delete)
* Control live crowd status

### 🛍 Vendor Management

* Add vendors with category & location
* Display vendors dynamically on homepage
* Organized in grid/table layout

### 📊 Live Crowd Monitoring

* Real-time crowd status (Low / Medium / High)
* Visualized using:

  * Animated bars
  * Music equalizer UI (advanced)
* Updates dynamically from backend

### 💳 Payment Integration (Basic)

* Simulated payment flow (can be extended to Razorpay/Stripe)

---

## 🛠 Tech Stack

### Frontend

* HTML5
* CSS3 (Custom styling + animations)
* JavaScript (Vanilla JS)

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Additional Libraries

* QR Code Generator (`qrcode`)
* PDF Generator (`pdfkit`)
* Authentication (JWT-based middleware)

---

## 📂 Project Structure

```
Lollapalooza/
│
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── booking.js
│   │   ├── vendor.js
│   │   └── crowd.js
│   ├── middleware/
│   ├── db.js
│   └── server.js
│
├── frontend/
│   ├── css/
│   │   ├── styles.css
│   │   └── admin.css
│   ├── js/
│   │   ├── crowd.js
│   │   ├── vendor.js
│   │   ├── admin.js
│   │   └── tickets.js
│   ├── index.html
│   ├── admin.html
│   └── tickets.html
│
└── festival_db.sql
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/lollapalooza.git
cd lollapalooza
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Setup Database

* Open MySQL
* Import `festival_db.sql`

### 4. Start server

```bash
node server.js
```

Server will run on:

```
http://localhost:5000
```

### 5. Run frontend

* Open `frontend/index.html` using Live Server

---

## 🔑 Key Functional Flow

1. User books ticket → data stored in MySQL
2. QR code generated → shown + used in PDF
3. Admin logs in → manages system
4. Vendors added → displayed on homepage
5. Crowd status updated → reflected in UI

---

## 📸 Screens (Optional)

* Homepage
* Admin Dashboard
* Ticket Booking Page
* QR Code + PDF Ticket

---

## 🧠 Learning Outcomes

* Full-stack development (Frontend + Backend)
* REST API design
* Database integration (MySQL)
* Authentication & authorization
* Real-time UI updates using polling
* PDF and QR code generation
* Debugging and system design

---

## 🔮 Future Enhancements

* Real payment gateway (Razorpay/Stripe)
* QR code scanning system for entry validation
* Email ticket delivery
* Real-time updates using WebSockets
* Mobile responsive design
* Analytics dashboard for crowd prediction

---

## 👨‍💻 Author

**Swaraj Ambawade**
Computer Engineering Student

---

## 📜 License

This project is created for academic purposes and learning.
