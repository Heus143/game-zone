// src/pages/Login.jsx

import { useMemo, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();

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
        order.userEmail?.toLowerCase() ===
        loggedUser.email?.toLowerCase()
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
      setError("Invalid email or password");
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

    const from =
      location.state?.from?.pathname || "/home";

    const search =
      location.state?.from?.search || "";

    const hash =
      location.state?.from?.hash || "";

    navigate(
      `${from}${search}${hash}`,
      {
        replace: true
      }
    );
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
                  Secure Account
                </h3>

                <p>
                  Manage your GameZone account
                  securely.
                </p>
              </div>
            </div>

          </div>

        </div>

        <div className="login-right">

          <div className="login-box">

            <h2>
              Login
            </h2>

            <p>
              Sign in to your GameZone account.
            </p>

            <form onSubmit={login}>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <div className="login-password">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Password"
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

              {error && (
                <small>
                  {error}
                </small>
              )}

              <button type="submit">
                Login
              </button>

            </form>

            <p>
              Don't have an account?{" "}

              <Link to="/register">
                Register
              </Link>
            </p>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="login-page">

      <div className="login-left">

        <p className="login-brand">
          GAMEZONE
        </p>

        <h1>
          Welcome, {loggedUser.name}
        </h1>

        <p className="login-intro">
          Manage your GameZone account.
        </p>

      </div>

      <div className="login-right">

        <div className="login-box">

          <h2>
            My Account
          </h2>

          <p>
            {loggedUser.email}
          </p>

          <p>
            Cart Items: {cartItems}
          </p>

          <p>
            Cart Total: ₹
            {totalAmount.toLocaleString("en-IN")}
          </p>

          <p>
            Orders: {userOrderCount}
          </p>

          <div>

            <Link to="/products">
              Products
            </Link>

            {" "}

            <Link to="/cart">
              Cart
            </Link>

            {" "}

            <Link to="/orders">
              Orders
            </Link>

          </div>

          <button
            type="button"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;