import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer>

      <div className="footer-container">

        <div className="footer-section">

          <h3>GameZone</h3>

          <p>
            Your gaming marketplace for products,
            accessories and gaming essentials.
          </p>

        </div>

        <div className="footer-section">

          <h4>Quick Links</h4>

          <div className="footer-links">

            <Link to="/home">
              Home
            </Link>

            <Link to="/about">
              About
            </Link>

            <Link to="/products">
              Products
            </Link>

            <Link to="/categories">
              Categories
            </Link>

            <Link to="/contact">
              Contact
            </Link>

            <Link to="/cart">
              Your Items
            </Link>

            <Link to="/orders">
              Your Orders
            </Link>

          </div>

        </div>

        <div className="footer-section">

          <h4>Contact Us</h4>

          <p>
            gamezone@gmail.com
          </p>

          <p>
            +91 98765 43210
          </p>

          <p>
            Hyderabad, India
          </p>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 GameZone. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;