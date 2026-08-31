# 🎮 GameZone

GameZone is a modern gaming marketplace web application built with React. It provides gamers with a simple and user-friendly platform to explore gaming products, browse categories, manage their shopping cart, and place orders.

The project demonstrates a complete e-commerce workflow with user authentication, product management, wishlist, cart, checkout, and order management.

## 🚀 Project Overview

GameZone is designed as a real-world gaming e-commerce application where users can discover gaming accessories and products in different categories.

Users can:

- Browse gaming products
- Explore products by category
- Search and filter products
- View detailed product information
- Add products to cart
- Manage cart quantities
- Add and remove wishlist items
- Register and login
- Complete checkout
- Place orders
- View previous orders

The application has a clean, responsive interface designed for desktop, tablet, and mobile users.

## ✨ Features

### 🎮 Product Management

- View all gaming products
- View individual product details
- Browse products by category
- Search products
- Filter products
- Display product price and information

### 🛒 Shopping Cart

- Add products to cart
- Increase product quantity
- Decrease product quantity
- Remove products
- Calculate total cart value
- View cart items before checkout

### ❤️ Wishlist

- Add products to wishlist
- Remove products from wishlist
- View saved products

### 👤 Authentication

- User registration
- User login
- Email validation
- Mobile number validation
- Password validation
- Confirm password validation
- Login error handling
- Registration error handling

### 📦 Orders

- Checkout products
- Place orders
- Store order information
- View previous orders
- View customer details
- View ordered products
- View order status

### 🔎 Search & Filtering

Users can easily find gaming products using search and filtering functionality.

### 📱 Responsive Design

GameZone is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile devices

## 🧩 Main Application Flow

```text
Landing Page
      ↓
Home
      ↓
Products
      ↓
Product Details
      ↓
Add to Cart / Wishlist
      ↓
Cart
      ↓
Checkout
      ↓
Place Order
      ↓
Orders
```

## 🔐 Authentication Flow

```text
Register
   ↓
Create Account
   ↓
Login
   ↓
Validate User
   ↓
Home Page
```

## 🛍️ Shopping Flow

```text
Browse Products
      ↓
Select Product
      ↓
View Product Details
      ↓
Add to Cart
      ↓
Manage Cart
      ↓
Checkout
      ↓
Place Order
      ↓
View Orders
```

## 🛠️ Technologies Used

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3

### State Management

- Redux
- Redux Toolkit

### Routing

- React Router DOM

### API

- Axios
- REST API

### Backend / Data

- JSON Server

### Tools

- Visual Studio Code
- Git
- GitHub
- npm
- Vite

## 📁 Project Structure

```text
GameZone/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Categories.jsx
│   │   ├── Cart.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Checkout.jsx
│   │   ├── Orders.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Contact.jsx
│   │
│   ├── redux/
│   │   ├── slices/
│   │   └── store.js
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── utils/
│   │   └── validation.js
│   │
│   ├── styles/
│   │   └── ...
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── db.json
├── package.json
└── README.md
```

## 🔄 API Operations

GameZone uses REST API operations through Axios.

```text
GET
↓
Fetch products, users and orders

POST
↓
Create users, products and orders

PUT
↓
Update existing data

DELETE
↓
Delete existing data
```

## 🧠 React Concepts Used

This project demonstrates:

- Functional Components
- JSX
- Props
- useState
- useEffect
- Event Handling
- Conditional Rendering
- Forms
- React Router
- Dynamic Routing
- Redux
- Redux Toolkit
- API Integration
- CRUD Operations
- Reusable Components

## 🔄 Redux State Management

Redux is used to manage application-wide state.

```text
Authentication
      ↓
User Information

Cart
      ↓
Cart Items
      ↓
Quantity
      ↓
Total Price

Wishlist
      ↓
Wishlist Products
```

## ✅ Form Validation

GameZone uses regular expressions for validating user input.

Validation includes:

- Name validation
- Email validation
- Mobile number validation
- Password validation
- Confirm password validation
- Required fields

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Heus143/Game-Zone.git
```

### 2. Open the Project

```bash
cd Game-Zone
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start JSON Server

Open one terminal and run:

```bash
npx json-server --watch db.json --port 3000
```

### 5. Start React Application

Open another terminal and run:

```bash
npm run dev
```

## 🌐 Application Pages

GameZone contains the following major pages:

```text
Landing
Home
About
Products
Product Details
Categories
Cart
Wishlist
Checkout
Orders
Login
Register
Contact
```

## 🎯 Project Objectives

The main objectives of this project are:

- Build a real-world React application
- Understand component-based development
- Implement Redux state management
- Work with REST APIs
- Implement CRUD operations
- Implement authentication
- Implement form validation
- Create shopping cart functionality
- Create wishlist functionality
- Implement checkout and order management
- Build responsive user interfaces
- Practice Git and GitHub

## 💡 Key Learning

While developing GameZone, I gained practical experience in:

- React.js development
- Redux state management
- REST API integration
- Axios
- React Router
- CRUD operations
- Form validation
- Authentication flow
- Shopping cart implementation
- Wishlist management
- Order management
- Responsive CSS
- Git and GitHub

## 🔮 Future Improvements

The project can be extended with:

- Online payment integration
- User profile management
- Product reviews and ratings
- Advanced product filtering
- Order tracking
- Admin dashboard
- Admin product management
- Secure backend authentication
- JWT authentication
- Database integration
- Product recommendations

## 👨‍💻 Developer

### Hemanth Kumar Divvela

GameZone is a gaming marketplace project developed to demonstrate practical frontend development skills using React, Redux, REST APIs, routing, validation, and modern web development practices.

## ⭐ Project Highlights

```text
🎮 Gaming Marketplace
⚛️ React.js
🔄 Redux Toolkit
🌐 REST API
🛒 Shopping Cart
❤️ Wishlist
👤 User Authentication
📦 Order Management
🔎 Search & Filtering
✅ Form Validation
📱 Responsive UI
🔧 CRUD Operations
🚀 Vite
🐙 Git & GitHub
```

## 📌 Conclusion

GameZone demonstrates a complete gaming marketplace experience starting from product discovery and category browsing to authentication, wishlist management, cart management, checkout, and order tracking.

The project was developed to gain hands-on experience in building a structured, reusable, responsive, and user-friendly React application. 
