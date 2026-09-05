import {
  useEffect,
  useMemo,
  useState
} from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearCart } from "../redux/slices/cartSlice";
import { addOrder } from "../redux/slices/ordersSlice";

import "../styles/checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(
    (state) => state.cart.cart
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setForm((previousForm) => ({
        ...previousForm,
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || ""
      }));
    }
  }, [user]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: ""
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    } else if (
      !/^[6-9]\d{9}$/.test(form.phone)
    ) {
      newErrors.phone =
        "Enter a valid 10-digit phone number";
    }

    if (!form.address.trim()) {
      newErrors.address =
        "Address is required";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!form.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!form.pincode.trim()) {
      newErrors.pincode =
        "Pincode is required";
    } else if (
      !/^\d{6}$/.test(form.pincode)
    ) {
      newErrors.pincode =
        "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const placeOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty");
      navigate("/products");
      return;
    }

    if (!user) {
      navigate("/login", {
        state: {
          from: {
            pathname: "/checkout"
          }
        }
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    const orderId = Date.now();

    const newOrder = {
      id: orderId,

      userId: user.id,

      userEmail: user.email,

      placedAt: Date.now(),

      items: cart,

      customer: {
        ...form,
        email: user.email
      },

      subtotal,

      delivery,

      total,

      date: new Date().toLocaleString(),

      status: "Placed",

      tracking: {
        currentStep: 0,

        steps: [
          {
            title: "Order Placed",
            description:
              "Your order has been successfully placed.",
            completed: true
          },

          {
            title: "Order Confirmed",
            description:
              "Your order is being confirmed.",
            completed: false
          },

          {
            title: "Packed",
            description:
              "Your products are being packed.",
            completed: false
          },

          {
            title: "Shipped",
            description:
              "Your order has been shipped.",
            completed: false
          },

          {
            title: "Out for Delivery",
            description:
              "Your order is on the way.",
            completed: false
          },

          {
            title: "Delivered",
            description:
              "Your order has been delivered.",
            completed: false
          }
        ]
      }
    };

    dispatch(addOrder(newOrder));

    dispatch(clearCart());

    alert("Order placed successfully");

    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">

        <div className="checkout-empty">

          <h1>
            Your Cart is Empty
          </h1>

          <p>
            Add some products before checkout.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/products")
            }
          >
            Continue Shopping
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="checkout-page">

      <div className="checkout-container">

        <div className="checkout-header">

          <p>
            GAMEZONE
          </p>

          <h1>
            Checkout
          </h1>

          <span>
            Enter your delivery details to
            place your order.
          </span>

        </div>

        <form onSubmit={placeOrder}>

          <div className="checkout-layout">

            <div className="checkout-form">

              <h2>
                Delivery Details
              </h2>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
              />

              {errors.name && (
                <small>
                  {errors.name}
                </small>
              )}

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
              />

              {errors.phone && (
                <small>
                  {errors.phone}
                </small>
              )}

              <textarea
                name="address"
                placeholder="Full Address"
                value={form.address}
                onChange={handleChange}
                rows="4"
              />

              {errors.address && (
                <small>
                  {errors.address}
                </small>
              )}

              <div className="checkout-row">

                <div>

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                  />

                  {errors.city && (
                    <small>
                      {errors.city}
                    </small>
                  )}

                </div>

                <div>

                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={form.state}
                    onChange={handleChange}
                  />

                  {errors.state && (
                    <small>
                      {errors.state}
                    </small>
                  )}

                </div>

              </div>

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange}
              />

              {errors.pincode && (
                <small>
                  {errors.pincode}
                </small>
              )}

            </div>

            <div className="checkout-summary">

              <h2>
                Order Summary
              </h2>

              {cart.map((item) => (

                <div
                  className="checkout-item"
                  key={item.id}
                >

                  <div>

                    <strong>
                      {item.name}
                    </strong>

                    <p>
                      Qty:{" "}
                      {Number(
                        item.quantity || 1
                      )}
                    </p>

                  </div>

                  <span>
                    ₹
                    {(
                      Number(item.price || 0) *
                      Number(item.quantity || 1)
                    ).toLocaleString("en-IN")}
                  </span>

                </div>

              ))}

              <hr />

              <div className="checkout-summary-row">

                <span>
                  Subtotal
                </span>

                <span>
                  ₹
                  {subtotal.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              <div className="checkout-summary-row">

                <span>
                  Delivery
                </span>

                <span>
                  ₹
                  {delivery.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              <div className="checkout-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹
                  {total.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <button
                type="submit"
                className="place-order-button"
              >
                Place Order
              </button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Checkout;