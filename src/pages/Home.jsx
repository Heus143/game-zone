import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="home">

      <section className="hero">

        <div className="hero-content">

          <p className="small-title">
            GAMEZONE
          </p>

          <h1>
            Level Up Your Gaming
          </h1>

          <p className="hero-text">
            Gaming Products Marketplace
          </p>

          <p className="hero-subtext">
            Discover gaming products, accessories and gear for every gamer.
          </p>

          <div className="hero-buttons">

            <Link
              to="/products"
              className="hero-primary-button"
            >
              Explore Products
            </Link>

            <Link
              to="/categories"
              className="hero-secondary-button"
            >
              View Categories
            </Link>

          </div>

        </div>

      </section>

      <section className="categories">

        <div className="category-card gaming-card">

          <p>
            GAMING
          </p>

          <h2>
            Gaming Products
          </h2>

          <span>
            Explore the latest products for your gaming setup.
          </span>

          <Link
            to="/products"
            className="category-button"
          >
            Explore Products
          </Link>

        </div>

        <div className="category-card accessories-card">

          <p>
            ACCESSORIES
          </p>

          <h2>
            Gaming Accessories
          </h2>

          <span>
            Upgrade your setup with quality gaming accessories.
          </span>

          <Link
            to="/products?category=Accessories"
            className="category-button"
          >
            Explore Collection
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;