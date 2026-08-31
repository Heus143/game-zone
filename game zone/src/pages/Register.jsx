import { useState } from "react";
import { Link } from "react-router-dom";
import {
  nameRegex,
  emailRegex,
  phoneRegex,
  passwordRegex
} from "../utils/validation";
import "../styles/register.css";

function Register() {
  const empty = {
    name: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    country: ""
  };

  const [form, setForm] = useState(empty);
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] =
    useState(false);
  const [showConfirm, setShowConfirm] =
    useState(false);

  const change = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value
    }));

    setError((previousError) => ({
      ...previousError,
      [name]: ""
    }));
  };

  const validate = () => {
    const errors = {};

    if (!nameRegex.test(form.name.trim())) {
      errors.name = "Invalid name";
    }

    if (!emailRegex.test(form.email.trim())) {
      errors.email = "Invalid email";
    }

    if (!form.gender) {
      errors.gender = "Select gender";
    }

    if (!phoneRegex.test(form.phone.trim())) {
      errors.phone = "Invalid phone";
    }

    if (!form.address.trim()) {
      errors.address = "Enter address";
    }

    if (!passwordRegex.test(form.password)) {
      errors.password = "Invalid password";
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      errors.confirmPassword =
        "Passwords don't match";
    }

    if (!form.country) {
      errors.country =
        "Select country";
    }

    return errors;
  };

  const register = (e) => {
    e.preventDefault();

    const errors = validate();

    setError(errors);

    if (
      Object.keys(errors).length > 0
    ) {
      return;
    }

    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() ===
        form.email.trim().toLowerCase()
    );

    if (emailExists) {
      setError({
        email:
          "An account with this email already exists"
      });

      return;
    }

    const newUser = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      gender: form.gender,
      phone: form.phone.trim(),
      address: form.address.trim(),
      password: form.password,
      country: form.country
    };

    const updatedUsers = [
      ...users,
      newUser
    ];

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    alert(
      "Registration successful! Please login."
    );

    setForm(empty);
    setError({});
    setShowPassword(false);
    setShowConfirm(false);
  };

  return (
    <div className="register-page">

      <div className="register-left">

        <p className="register-brand">
          GAMEZONE
        </p>

        <h1>
          Join GameZone
        </h1>

        <p className="register-intro">
          Create your account and start your
          gaming journey.
        </p>

        <div className="register-features">

          <div className="register-feature">
            <span>✓</span>

            <p>
              Discover gaming products and
              accessories
            </p>
          </div>

          <div className="register-feature">
            <span>✓</span>

            <p>
              Save your favourite gaming
              products
            </p>
          </div>

          <div className="register-feature">
            <span>✓</span>

            <p>
              Track your orders and delivery
            </p>
          </div>

          <div className="register-feature">
            <span>✓</span>

            <p>
              Manage your gaming account
            </p>
          </div>

        </div>

        <div className="delivery-box">

          <strong>
            🎮 Gaming Made Simple
          </strong>

          <p>
            Find gaming products and
            accessories in one convenient
            marketplace.
          </p>

        </div>

      </div>

      <div className="register-right">

        <div className="register-box">

          <h2>
            Create Account
          </h2>

          <p className="register-subtitle">
            Fill in your details to get
            started.
          </p>

          <form onSubmit={register}>

            <div className="form-row">

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={change}
                />

                <small>
                  {error.name}
                </small>

              </div>

              <div className="form-group">

                <label>
                  Email
                </label>

                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={change}
                />

                <small>
                  {error.email}
                </small>

              </div>

            </div>

            <div className="form-row">

              <div className="form-group">

                <label>
                  Gender
                </label>

                <select
                  name="gender"
                  value={form.gender}
                  onChange={change}
                >
                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>

                <small>
                  {error.gender}
                </small>

              </div>

              <div className="form-group">

                <label>
                  Phone
                </label>

                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={change}
                />

                <small>
                  {error.phone}
                </small>

              </div>

            </div>

            <div className="form-group">

              <label>
                Address
              </label>

              <textarea
                name="address"
                placeholder="Enter your address"
                value={form.address}
                onChange={change}
              />

              <small>
                {error.address}
              </small>

            </div>

            <div className="form-row">

              <div className="form-group">

                <label>
                  Password
                </label>

                <div className="register-password">

                  <input
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Password"
                    value={form.password}
                    onChange={change}
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

                <small>
                  {error.password}
                </small>

              </div>

              <div className="form-group">

                <label>
                  Confirm Password
                </label>

                <div className="register-password">

                  <input
                    name="confirmPassword"
                    type={
                      showConfirm
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm Password"
                    value={
                      form.confirmPassword
                    }
                    onChange={change}
                  />

                  <span
                    onClick={() =>
                      setShowConfirm(
                        (previous) =>
                          !previous
                      )
                    }
                  >
                    {showConfirm
                      ? "🙈"
                      : "👀"}
                  </span>

                </div>

                <small>
                  {error.confirmPassword}
                </small>

              </div>

            </div>

            <div className="form-group">

              <label>
                Country
              </label>

              <select
                name="country"
                value={form.country}
                onChange={change}
              >
                <option value="">
                  Select Country
                </option>

                <option value="India">
                  🇮🇳 +91 India
                </option>

                <option value="USA">
                  🇺🇸 +1 USA
                </option>

                <option value="UK">
                  🇬🇧 +44 UK
                </option>

                <option value="Canada">
                  🇨🇦 +1 Canada
                </option>

                <option value="Australia">
                  🇦🇺 +61 Australia
                </option>
              </select>

              <small>
                {error.country}
              </small>

            </div>

            <button type="submit">
              Create Account
            </button>

          </form>

          <p className="login-link">
            Already have an account?{" "}

            <Link to="/login">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;