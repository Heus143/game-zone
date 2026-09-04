import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
} from "../redux/slices/cartSlice";

import "../styles/cart.css";

function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector(
    (state) => state.cart.cart
  );

  const itemCount = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + Number(item.quantity || 1),
      0
    );
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 1),
      0
    );
  }, [cart]);

  const delivery = subtotal > 0 ? 99 : 0;

  const total = subtotal + delivery;

  if (cart.length === 0) {
    return (
      <div className="cart-page">

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🎮
          </div>

          <h1>
            Your Cart is Empty
          </h1>

          <p>
            You haven't added any gaming products yet.
          </p>

          <Link
            to="/products"
            className="continue-shopping"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="cart-page">

      <div className="cart-container">

        <div className="cart-header">

          <div>

            <p className="cart-label">
              GAMEZONE
            </p>

            <h1>
              Your Items
            </h1>

            <p>
              Review your selected gaming products.
            </p>

          </div>

          <Link
            to="/products"
            className="continue-shopping"
          >
            Continue Shopping
          </Link>

        </div>

        <div className="cart-layout">

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <div className="cart-product-image">

                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                    />
                  ) : (
                    <span>🎮</span>
                  )}

                </div>

                <div className="cart-product-details">

                  <h3>
                    {item.name}
                  </h3>

                  <p className="product-category">
                    {item.category || "Gaming"}
                  </p>

                  <p className="product-price">
                    ₹
                    {Number(
                      item.price || 0
                    ).toLocaleString("en-IN")}
                  </p>

                </div>

                <div className="quantity-box">

                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        decreaseQuantity(item.id)
                      )
                    }
                  >
                    −
                  </button>

                  <span>
                    {Number(item.quantity) || 1}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        increaseQuantity(item.id)
                      )
                    }
                  >
                    +
                  </button>

                </div>

                <div className="item-total">

                  <strong>
                    ₹
                    {(
                      Number(item.price || 0) *
                      Number(item.quantity || 1)
                    ).toLocaleString("en-IN")}
                  </strong>

                </div>

                <button
                  type="button"
                  className="remove-item"
                  onClick={() =>
                    dispatch(
                      removeFromCart(item.id)
                    )
                  }
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          <div className="order-summary">

            <h2>
              Order Summary
            </h2>

            <div className="summary-row">

              <span>
                Items
              </span>

              <span>
                {itemCount}
              </span>

            </div>

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <span>
                ₹
                {subtotal.toLocaleString("en-IN")}
              </span>

            </div>

            <div className="summary-row">

              <span>
                Delivery
              </span>

              <span>
                ₹
                {delivery.toLocaleString("en-IN")}
              </span>

            </div>

            <hr />

            <div className="summary-total">

              <span>
                Total Amount
              </span>

              <strong>
                ₹
                {total.toLocaleString("en-IN")}
              </strong>

            </div>

            <Link
              to="/checkout"
              className="checkout-button"
            >
              Proceed to Checkout
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;