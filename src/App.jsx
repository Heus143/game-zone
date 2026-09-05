import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import TrackOrder from "./pages/TrackOrder";

import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route
        path="/*"
        element={
          <>
            <Navbar />

            <main>
              <Routes>

                <Route
                  path="/home"
                  element={<Home />}
                />

                <Route
                  path="/about"
                  element={<About />}
                />

                <Route
                  path="/products"
                  element={<Products />}
                />

                <Route
                  path="/products/:id"
                  element={<ProductDetails />}
                />

                <Route
                  path="/categories"
                  element={<Categories />}
                />

                <Route
                  path="/cart"
                  element={<Cart />}
                />

                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/track-order/:id"
                  element={
                    <ProtectedRoute>
                      <TrackOrder />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/contact"
                  element={<Contact />}
                />

                <Route
                  path="/login"
                  element={<Login />}
                />

                <Route
                  path="/register"
                  element={<Register />}
                />

                <Route
                  path="/admin/login"
                  element={<AdminLogin />}
                />

                <Route
                  path="/admin/dashboard"
                  element={<Dashboard />}
                />

                <Route
                  path="/admin/users"
                  element={<Users />}
                />

              </Routes>
            </main>

            <Footer />
          </>
        }
      />
    </Routes>
  );
}

export default App;