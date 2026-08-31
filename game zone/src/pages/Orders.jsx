import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "../styles/orders.css";

function Orders() {
  const orders = useSelector(
    (state) => state.orders.orders
  );

  const sortedOrders = useMemo(() => {
    return [...orders].reverse();
  }, [orders]);

  if (orders.length === 0) {
    return (
      <div className="orders-page">

        <div className="empty-orders">

          <div className="orders-icon">
            🎮
          </div>

          <h1>
            Your Orders
          </h1>

          <p>
            You haven't placed any orders yet.
          </p>

          <Link to="/products">
            Start Shopping
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="orders-page">

      <div className="orders-container">

        <div className="orders-header">

          <p>
            GAMEZONE
          </p>

          <h1>
            Your Orders
          </h1>

          <span>
            View your previous gaming orders and details.
          </span>

        </div>

        <div className="orders-list">

          {sortedOrders.map((order) => (

            <div
              className="order-card"
              key={order.id}
            >

              <div className="order-top">

                <div>

                  <h3>
                    Order #{order.id}
                  </h3>

                  <p>
                    {order.date || "Recent Order"}
                  </p>

                </div>

                <div className="order-actions">

                  <span className="order-status">
                    {order.status || "Placed"}
                  </span>

                  <Link
                    to={`/track-order/${order.id}`}
                    className="track-order-button"
                  >
                    Track Order
                  </Link>

                </div>

              </div>

              <div className="order-items">

                {order.items?.map((item) => (

                  <div
                    className="order-item"
                    key={item.id}
                  >

                    <div className="order-image">

                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                        />
                      ) : (
                        <span>
                          🎮
                        </span>
                      )}

                    </div>

                    <div className="order-item-details">

                      <h4>
                        {item.name}
                      </h4>

                      <p>
                        Category:{" "}
                        {item.category || "Gaming"}
                      </p>

                      <p>
                        Quantity:{" "}
                        {Number(
                          item.quantity
                        ) || 1}
                      </p>

                    </div>

                    <strong>
                      ₹
                      {(
                        Number(
                          item.price || 0
                        ) *
                        Number(
                          item.quantity || 1
                        )
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>

                ))}

              </div>

              <div className="order-address">

                <h4>
                  Delivery Address
                </h4>

                <p>
                  {order.customer?.name}
                </p>

                <p>
                  {order.customer?.phone}
                </p>

                <p>
                  {order.customer?.address}
                </p>

                <p>
                  {order.customer?.city},{" "}
                  {order.customer?.state} -{" "}
                  {order.customer?.pincode}
                </p>

              </div>

              <div className="order-bottom">

                <span>
                  Total Amount
                </span>

                <strong>
                  ₹
                  {Number(
                    order.total || 0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Orders;