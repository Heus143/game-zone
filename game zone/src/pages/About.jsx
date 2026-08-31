import "../styles/about.css";

function About() {
  return (
    <div className="about">

      <div className="about-hero">

        <p className="about-label">
          GAMEZONE
        </p>

        <h1>
          About GameZone
        </h1>

        <p>
          Where gaming meets convenience.
        </p>

      </div>

      <div className="about-content">

        <div className="about-intro">

          <p className="section-label">
            OUR STORY
          </p>

          <h2>
            Gaming Made Simple
          </h2>

          <p>
            GameZone is a gaming products marketplace designed
            for gamers who want quality products, useful accessories
            and an easy shopping experience.
          </p>

          <p>
            Our platform brings gaming products together in one
            simple and convenient place.
          </p>

        </div>

        <div className="about-boxes">

          <div className="about-box">

            <span>01</span>

            <h3>
              Quality Gaming Products
            </h3>

            <p>
              Discover gaming products and accessories
              for your gaming setup.
            </p>

          </div>

          <div className="about-box">

            <span>02</span>

            <h3>
              Easy Shopping
            </h3>

            <p>
              Browse products, add your favorites to the cart
              and enjoy a simple shopping experience.
            </p>

          </div>

          <div className="about-box">

            <span>03</span>

            <h3>
              Built for Gamers
            </h3>

            <p>
              Find gaming gear and accessories designed
              for different types of gamers.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default About;