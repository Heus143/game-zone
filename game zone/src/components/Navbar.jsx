import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";

function Navbar() {
  const cart = useSelector(
    (state) => state.cart.cart
  );

  const cartCount = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  return (
    <nav className="navbar">

      <Link
        to="/home"
        className="logo"
      >
        <span className="logo-icon">
          🎮
        </span>

        <span>
          Game<span>Zone</span>
        </span>
      </Link>

      <div className="links">

        <NavLink to="/home">
          Home
        </NavLink>

        <NavLink to="/about">
          About
        </NavLink>

        <NavLink to="/products">
          Products
        </NavLink>

        <NavLink to="/categories">
          Categories
        </NavLink>

        <NavLink
          to="/cart"
          className="cart-link"
        >
          <span>Cart</span>

          <span className="cart-count">
            {cartCount}
          </span>
        </NavLink>

        <NavLink to="/orders">
          Orders
        </NavLink>

        <NavLink to="/contact">
          Contact
        </NavLink>

        <NavLink
          to="/login"
          className="login-btn"
        >
          Login
        </NavLink>

        <NavLink
          to="/register"
          className="register-btn"
        >
          Register
        </NavLink>

        <NavLink
          to="/admin/login"
          className="admin-btn"
        >
          Admin
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;