import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  }, []);

  const removeItem = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== id
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">

        <div className="empty-wishlist">

          <div className="wishlist-icon">
            ♡
          </div>

          <h1>Your Wishlist</h1>

          <p>
            You haven't added any items to your wishlist yet.
          </p>

          <Link to="/men">
            Continue Shopping
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="wishlist-page">

      <div className="wishlist-container">

        <div className="wishlist-header">

          <p>STYLECLOUD</p>

          <h1>Your Wishlist</h1>

          <span>
            Your favorite fashion items are saved here.
          </span>

        </div>

        <div className="wishlist-items">

          {wishlist.map((item) => (

            <div
              className="wishlist-item"
              key={item.id}
            >

              <div className="wishlist-image">

                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                ) : (
                  <span>👕</span>
                )}

              </div>

              <div className="wishlist-details">

                <h3>{item.name}</h3>

                <p>
                  {item.category || "Fashion"}
                </p>

                <strong>
                  ₹{Number(
                    item.price || 0
                  ).toLocaleString("en-IN")}
                </strong>

              </div>

              <button
                onClick={() =>
                  removeItem(item.id)
                }
              >
                Remove
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Wishlist;