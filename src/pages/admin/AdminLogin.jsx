import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("admin", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="admin-login">

      <div className="admin-box">

        <p className="admin-brand">
          GAMEZONE
        </p>

        <h1>Admin Login</h1>

        <p>
          Manage your gaming marketplace.
        </p>

        <form onSubmit={login}>

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Admin Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;