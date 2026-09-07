import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="home">

      <section className="home-hero">

        <div className="home-bg-circle circle-one"></div>
        <div className="home-bg-circle circle-two"></div>

        <div className="home-hero-content">
          <div className="home-label">
            LEVEL UP YOUR SETUP
          </div>

          <h1>
            Everything You Need
            <br />
            <span>To Game Better.</span>
          </h1>

          <p>
            Build your ultimate gaming setup with powerful
            hardware, immersive accessories and gaming gear.
          </p>

          <div className="home-buttons">
            <Link to="/products" className="home-primary">
              Shop Gaming Gear
              <span>→</span>
            </Link>

            <Link to="/categories" className="home-secondary">
              Browse Categories
              <span>→</span>
            </Link>
          </div>

          <div className="home-mini-links">
            <span>Gaming PCs</span>
            <span>Consoles</span>
            <span>Accessories</span>
            <span>Gaming Gear</span>
          </div>
        </div>

        <div className="home-visual">
          <div className="visual-glow"></div>

          <img
            src="/gaming-home.png"
            alt="Gaming Setup"
          />
        </div>

      </section>

      <section className="home-stats">

        <div className="stat-item">
          <strong>74+</strong>
          <span>Gaming Products</span>
        </div>

        <div className="stat-item">
          <strong>4</strong>
          <span>Gaming Categories</span>
        </div>

        <div className="stat-item">
          <strong>24/7</strong>
          <span>Gaming Marketplace</span>
        </div>

        <div className="stat-item">
          <strong>100%</strong>
          <span>Secure Shopping</span>
        </div>

      </section>

      <section className="categories">

        <div className="category-heading">
          <p>EXPLORE GAMEZONE</p>

          <h2>
            Find Your Gaming Gear
          </h2>

          <span>
            Everything you need to create the perfect setup.
          </span>
        </div>

        <div className="category-grid">

          <div className="category-card gaming-card">
            <div>
              <p>01 / GAMING</p>

              <h3>
                Gaming Products
              </h3>

              <span>
                Discover powerful gaming products designed
                for an immersive gaming experience.
              </span>
            </div>

            <Link to="/products">
              Explore Products →
            </Link>
          </div>

          <div className="category-card accessories-card">
            <div>
              <p>02 / ACCESSORIES</p>

              <h3>
                Gaming Accessories
              </h3>

              <span>
                Upgrade your setup with keyboards, mice,
                headsets and essential gaming accessories.
              </span>
            </div>

            <Link to="/products?category=Accessories">
              Explore Collection →
            </Link>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;