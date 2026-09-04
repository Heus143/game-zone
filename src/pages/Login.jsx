import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  loginUser,
  logoutUser,
  updateUser
} from "../redux/slices/authSlice";

import {
  emailRegex,
  passwordRegex
} from "../utils/validation";

import "../styles/login.css";

function Login() {
  const dispatch = useDispatch();

  const cart = useSelector(
    (state) => state.cart.cart
  );

  const loggedUser = useSelector(
    (state) => state.auth.user
  );

  const orders = useSelector(
    (state) => state.orders.orders
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const cartItems = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + Number(item.quantity || 1),
      0
    );
  }, [cart]);

  const totalAmount = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 1),
      0
    );
  }, [cart]);

  const userOrderCount = useMemo(() => {
    if (!loggedUser) {
      return 0;
    }

    return orders.filter(
      (order) =>
        order.customer?.email ===
        loggedUser.email
    ).length;
  }, [orders, loggedUser]);

  const login = (e) => {
    e.preventDefault();

    setError("");

    if (!emailRegex.test(email)) {
      setError("Enter valid email");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Enter valid password");
      return;
    }

    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    const user = users.find(
      (item) =>
        item.email.toLowerCase() ===
          email.toLowerCase() &&
        item.password === password
    );

    if (!user) {
      setError(
        "Invalid email or password"
      );
      return;
    }

    const userWithoutPassword = {
      ...user
    };

    delete userWithoutPassword.password;
    delete userWithoutPassword.confirmPassword;

    dispatch(
      loginUser(userWithoutPassword)
    );

    setEmail("");
    setPassword("");
    setError("");
  };

  const logout = () => {
    dispatch(logoutUser());

    setEmail("");
    setPassword("");
    setError("");
    setEditMode(false);
  };

  const changeProfile = (e) => {
    dispatch(
      updateUser({
        [e.target.name]: e.target.value
      })
    );
  };

  const saveProfile = () => {
    if (!loggedUser) {
      return;
    }

    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    const updatedUsers = users.map(
      (user) =>
        user.id === loggedUser.id
          ? {
              ...user,
              ...loggedUser
            }
          : user
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    dispatch(
      updateUser(loggedUser)
    );

    setEditMode(false);

    alert(
      "Profile updated successfully!"
    );
  };

  if (!loggedUser) {
    return (
      <div className="login-page">

        <div className="login-left">

          <p className="login-brand">
            GAMEZONE
          </p>

          <h1>
            Welcome Back
          </h1>

          <p className="login-intro">
            Sign in to continue your gaming
            journey.
          </p>

          <div className="login-features">

            <div className="feature">
              <span>✓</span>

              <div>
                <h3>
                  Explore Gaming
                </h3>

                <p>
                  Discover the latest gaming
                  products and accessories.
                </p>
              </div>
            </div>

            <div className="feature">
              <span>✓</span>

              <div>
                <h3>
                  Manage Your Orders
                </h3>

                <p>
                  View and manage your gaming
                  purchases easily.
                </p>
              </div>
            </div>

            <div className="feature">
              <span>✓</span>

              <div>
                <h3>
                  Track Your Order
                </h3>

                <p>
                  Keep track of your order and
                  delivery status.
                </p>
              </div>
            </div>

            <div className="feature">
              <span>✓</span>

              <div>
                <h3>
                  Easy Shopping
                </h3>

                <p>
                  Enjoy a simple and convenient
                  gaming experience.
                </p>
              </div>
            </div>

          </div>

        </div>

        <div className="login-right">

          <div className="login-form-box">

            <h2>
              Login
            </h2>

            <p className="form-subtitle">
              Enter your details to access
              your account.
            </p>

            <form onSubmit={login}>

              <label>
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <label>
                Password
              </label>

              <div className="password-field">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                />

                <span
                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                >
                  {showPassword
                    ? "🙈"
                    : "👀"}
                </span>

              </div>

              <small className="login-error">
                {error}
              </small>

              <button type="submit">
                Login
              </button>

            </form>

            <p className="register-link">
              Don't have an account?{" "}

              <Link to="/register">
                Create Account
              </Link>
            </p>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="login-page">

      <div className="logged-in-page">

        <div className="user-sidebar">

          <p className="sidebar-brand">
            GAMEZONE
          </p>

          <h3>
            My Account
          </h3>

          <div className="user-menu">

            <Link to="/cart">
              🛒 Your Items
            </Link>

            <Link to="/orders">
              📦 Your Orders
            </Link>

            <Link to="/products">
              🎮 Continue Shopping
            </Link>

          </div>

          <div className="sidebar-total">

            <span>
              Cart Amount
            </span>

            <strong>
              ₹
              {totalAmount.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

        </div>

        <div className="profile-section">

          <div className="profile-header">

            <p>
              MY PROFILE
            </p>

            <h1>
              Account Details
            </h1>

            <span>
              Manage your personal information
            </span>

          </div>

          <div className="profile-card">

            <div className="profile-avatar">
              👤
            </div>

            <div className="profile-form">

              <div className="input-group">

                <label>
                  Full Name
                </label>

                <input
                  name="name"
                  value={
                    loggedUser.name || ""
                  }
                  readOnly={!editMode}
                  onChange={changeProfile}
                />

              </div>

              <div className="input-group">

                <label>
                  Email
                </label>

                <input
                  name="email"
                  type="email"
                  value={
                    loggedUser.email || ""
                  }
                  readOnly={!editMode}
                  onChange={changeProfile}
                />

              </div>

              <div className="input-group">

                <label>
                  Phone
                </label>

                <input
                  name="phone"
                  value={
                    loggedUser.phone || ""
                  }
                  readOnly={!editMode}
                  onChange={changeProfile}
                />

              </div>

              <div className="input-group">

                <label>
                  Gender
                </label>

                <input
                  name="gender"
                  value={
                    loggedUser.gender || ""
                  }
                  readOnly={!editMode}
                  onChange={changeProfile}
                />

              </div>

              <div className="input-group full">

                <label>
                  Address
                </label>

                <textarea
                  name="address"
                  value={
                    loggedUser.address || ""
                  }
                  readOnly={!editMode}
                  onChange={changeProfile}
                />

              </div>

              <button
                type="button"
                className="edit-profile"
                onClick={() =>
                  editMode
                    ? saveProfile()
                    : setEditMode(true)
                }
              >
                {editMode
                  ? "Save Changes"
                  : "Edit Profile"}
              </button>

            </div>

          </div>

        </div>

        <div className="account-right">

          <div className="account-top">

            <div>

              <span>
                WELCOME BACK
              </span>

              <h2>
                Hi,{" "}
                {loggedUser.name} 👋
              </h2>

            </div>

            <button
              type="button"
              className="logout-button"
              onClick={logout}
            >
              Logout
            </button>

          </div>

          <div className="account-info">

            <p className="account-label">
              GAMEZONE
            </p>

            <h3>
              Your Gaming Journey
            </h3>

            <p>
              Everything you need for a
              simple, exciting and convenient
              gaming experience.
            </p>

          </div>

          <div className="account-stats">

            <div>

              <strong>
                {userOrderCount}
              </strong>

              <span>
                Your Orders
              </span>

            </div>

            <div>

              <strong>
                {cartItems}
              </strong>

              <span>
                Your Items
              </span>

            </div>

            <div>

              <strong>
                ₹
                {totalAmount.toLocaleString(
                  "en-IN"
                )}
              </strong>

              <span>
                Cart Amount
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;