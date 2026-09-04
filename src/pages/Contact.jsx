import { useNavigate } from "react-router-dom";
import "../styles/contact.css";

function Contact() {
  const navigate = useNavigate();

  const exploreProducts = () => {
    navigate("/products");
  };

  const getInTouch = () => {
    window.location.href =
      "mailto:gamezone@gmail.com?subject=GameZone%20Enquiry";
  };

  return (
    <div className="contact-page">

      <div className="contact-content">

        <p className="contact-label">
          GAMEZONE
        </p>

        <h1>
          Ready to Level Up?
        </h1>

        <p className="contact-text">
          Explore gaming products, upgrade your setup
          and find the gear that fits your gaming style.
        </p>

        <div className="contact-buttons">

          <button
            type="button"
            onClick={exploreProducts}
          >
            Explore Products
          </button>

          <button
            type="button"
            className="contact-button"
            onClick={getInTouch}
          >
            Get in Touch
          </button>

        </div>

      </div>

      <div className="contact-info">

        <div>
          <h3>Email</h3>
          <p>gamezone@gmail.com</p>
        </div>

        <div>
          <h3>Phone</h3>
          <p>+91 98765 43210</p>
        </div>

        <div>
          <h3>Location</h3>
          <p>Hyderabad, India</p>
        </div>

      </div>

    </div>
  );
}

export default Contact;