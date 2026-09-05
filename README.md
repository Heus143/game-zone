# 🎮 GameZone

<p align="center">
  <b>A Modern Gaming E-Commerce Platform</b>
</p>

<p align="center">
  Discover gaming products, build your setup, manage your cart, place orders, and track your purchases — all in one place.
</p>

---

## 🌐 Live Demo

🔗 https://gamezone-wrvz.onrender.com

## 💻 GitHub Repository

🔗 https://github.com/Heus143/game-zone

---

## 📌 About The Project

**GameZone** is a modern and responsive gaming e-commerce web application built with React.js.

The platform is designed for gamers to explore gaming products and accessories through a simple and user-friendly interface. Users can browse products, search and filter products, view detailed product information, add products to their cart, complete checkout, manage orders, and track their purchases.

The project also includes authentication features and an admin dashboard for managing users and application data.

---

## ✨ Features

### 🛍️ Product Management

- Browse gaming products
- Product search
- Category-based filtering
- Price filtering
- Rating filtering
- Color filtering
- Product sorting
- Detailed product pages
- Product availability and stock information

### 🛒 Shopping Experience

- Add products to cart
- Update cart quantities
- Remove products from cart
- View cart summary
- Checkout process
- Order placement

### 🔐 Authentication

- User registration
- User login
- Form validation
- Password confirmation
- Mobile number validation
- Email validation

### 📦 Order Management

- View placed orders
- Order details
- Order tracking
- Order status management

### 👨‍💻 Admin Features

- Admin login
- Admin dashboard
- User management
- Application management interface

### 📱 User Interface

- Responsive design
- Clean navigation
- Modern gaming-themed UI
- Bootstrap components
- Bootstrap Icons
- Responsive product cards

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React.js | User Interface |
| JavaScript | Application Logic |
| React Router DOM | Routing |
| Redux Toolkit | State Management |
| React Redux | Redux Integration |
| Vite | Development & Build Tool |
| CSS3 | Styling |
| Bootstrap | UI Components |
| Bootstrap Icons | Icons |

### Data & API

| Technology | Purpose |
|------------|---------|
| JSON Server | Local API |
| REST API | Data Communication |
| Fetch API | API Requests |
| JSON | Product Data |

### Development & Deployment

| Technology | Purpose |
|------------|---------|
| Git | Version Control |
| GitHub | Source Code Management |
| Render | Deployment |
| Vercel | Deployment |

---

## 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │      GameZone       │
                    │    React Frontend   │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
        React Router      Redux Toolkit      Fetch API
             │                 │                 │
             ▼                 ▼                 ▼
          Pages             Global State       JSON Data
             │                                   │
             └─────────────────┬─────────────────┘
                               ▼
                         Product / Order
                            Management
GameZone/
│
├── api/
│   └── product.js
│
├── public/
│   ├── db.json
│   └── gaming-hero.jpg
│
├── src/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Landing.jsx
│   │   ├── About.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Categories.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Orders.jsx
│   │   ├── TrackOrder.jsx
│   │   ├── Contact.jsx
│   │   │
│   │   └── admin/
│   │       ├── AdminLogin.jsx
│   │       ├── Dashboard.jsx
│   │       └── Users.jsx
│   │
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── cartSlice.js
│   │   │   └── ordersSlice.js
│   │   │
│   │   └── store.js
│   │
│   ├── styles/
│   │   ├── about.css
│   │   ├── admin.css
│   │   ├── cart.css
│   │   ├── categories.css
│   │   ├── checkout.css
│   │   ├── contact.css
│   │   ├── home.css
│   │   ├── landing.css
│   │   ├── login.css
│   │   ├── orders.css
│   │   ├── product-details.css
│   │   ├── products.css
│   │   ├── register.css
│   │   ├── track-order.css
│   │   └── ...
│   │
│   ├── utils/
│   │   └── validation.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── public/
│   ├── db.json
│   └── gaming-hero.jpg
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md

## ⚙️ Getting Started

### Clone & Install

```bash
git clone https://github.com/Heus143/game-zone.git
cd "game zone"
npm install
npm run dev

🔮 Future Improvements
Real payment gateway
Cloud database
Secure backend authentication
Email notifications
Advanced admin analytics
Product recommendations
