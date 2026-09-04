import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/landing.css";

function Landing() {
  return (
    <div className="landing">
      <Navbar />

      <section className="landing-hero">
        <div className="landing-overlay"></div>

        <div className="landing-content">
          <div className="welcome-badge">
            ✨ WELCOME TO GAMEZONE
          </div>

          <h1>
            Find Your Next
            <br />
            <span>Gaming Adventure.</span>
          </h1>

          <p className="landing-description">
            Discover gaming products, accessories and
            essentials for your ultimate gaming setup.
          </p>

          <div className="landing-buttons">
            <Link
              to="/products"
              className="primary-button"
            >
              Browse Products
              <span>→</span>
            </Link>

            <Link
              to="/categories"
              className="secondary-button"
            >
              Explore Categories
              <span>→</span>
            </Link>
          </div>

          <div className="gaming-tags">
            <Link to="/products">
              Gaming PCs <span>→</span>
            </Link>

            <Link to="/categories">
              Consoles <span>→</span>
            </Link>

            <Link to="/products">
              Gaming Accessories <span>→</span>
            </Link>

            <Link to="/products">
              Gaming Gear <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;