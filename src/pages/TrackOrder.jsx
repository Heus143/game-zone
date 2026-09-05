import {
  useEffect,
  useMemo,
  useState
} from "react";

import { useSelector } from "react-redux";
import {
  Link,
  useParams
} from "react-router-dom";

import "../styles/track-order.css";

function TrackOrder() {
  const { id } = useParams();

  const allOrders = useSelector(
    (state) => state.orders.orders
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  const orders = useMemo(() => {
    if (!user) {
      return [];
    }

    return allOrders.filter(
      (order) => {
        if (order.userId) {
          return (
            String(order.userId) ===
            String(user.id)
          );
        }

        return (
          order.userEmail?.toLowerCase() ===
          user.email?.toLowerCase()
        );
      }
    );
  }, [allOrders, user]);

  const order = useMemo(() => {
    return orders.find(
      (item) =>
        String(item.id) === String(id)
    );
  }, [orders, id]);

  const [, setCurrentTime] = useState(
    Date.now()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!order) {
    return (
      <div className="track-page">

        <div className="track-not-found">

          <div className="track-icon">
            🎮
          </div>

          <h1>
            Order Not Found
          </h1>

          <p>
            We couldn't find this order.
          </p>

          <Link to="/orders">
            Back to Orders
          </Link>

        </div>

      </div>
    );
  }

  const trackingSteps =
    order.tracking?.steps || [
      {
        title: "Order Placed",
        description:
          "Your order has been successfully placed."
      },
      {
        title: "Order Confirmed",
        description:
          "Your order is being confirmed."
      },
      {
        title: "Packed",
        description:
          "Your products are being packed."
      },
      {
        title: "Shipped",
        description:
          "Your order has been shipped."
      },
      {
        title: "Out for Delivery",
        description:
          "Your order is on the way."
      },
      {
        title: "Delivered",
        description:
          "Your order has been delivered."
      }
    ];

  const STEP_DURATION = 10 * 1000;

  const placedAt =
    Number(order.placedAt) ||
    Date.now();

  const elapsedTime =
    Math.max(
      0,
      Date.now() - placedAt
    );

  const calculatedStep = Math.min(
    trackingSteps.length - 1,
    Math.floor(
      elapsedTime / STEP_DURATION
    )
  );

  const currentStep = calculatedStep;

  const currentStatus =
    trackingSteps[currentStep]?.title ||
    "Order Placed";

  return (
    <div className="track-page">

      <div className="track-container">

        <Link
          to="/orders"
          className="track-back"
        >
          ← Back to Orders
        </Link>

        <div className="track-header">

          <p>
            GAMEZONE
          </p>

          <h1>
            Track Your Order
          </h1>

          <span>
            Order #{order.id}
          </span>

        </div>

        <div className="track-summary">

          <div>

            <span>
              Order Date
            </span>

            <strong>
              {order.date}
            </strong>

          </div>

          <div>

            <span>
              Current Status
            </span>

            <strong className="track-status">
              {currentStatus}
            </strong>

          </div>

          <div>

            <span>
              Total Amount
            </span>

            <strong>
              ₹
              {Number(
                order.total || 0
              ).toLocaleString("en-IN")}
            </strong>

          </div>

        </div>

        <div className="tracking-card">

          <h2>
            Delivery Tracking
          </h2>

          <div className="tracking-timeline">

            {trackingSteps.map(
              (step, index) => {

                const isCompleted =
                  index <= currentStep;

                const isCurrent =
                  index === currentStep;

                return (
                  <div
                    className={`tracking-step ${
                      isCompleted
                        ? "completed"
                        : ""
                    } ${
                      isCurrent
                        ? "current"
                        : ""
                    }`}
                    key={step.title}
                  >

                    <div className="tracking-line">

                      <div className="tracking-dot">

                        {isCompleted
                          ? "✓"
                          : index + 1}

                      </div>

                    </div>

                    <div className="tracking-content">

                      <div className="tracking-step-header">

                        <h3>
                          {step.title}
                        </h3>

                        {isCurrent && (
                          <span>
                            Current
                          </span>
                        )}

                      </div>

                      <p>
                        {step.description}
                      </p>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

        <div className="tracking-details">

          <div className="tracking-products">

            <h2>
              Order Items
            </h2>

            {order.items?.map(
              (item) => (

                <div
                  className="tracking-product"
                  key={item.id}
                >

                  <div className="tracking-product-image">

                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <span>
                        🎮
                      </span>
                    )}

                  </div>

                  <div>

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      Quantity:{" "}
                      {Number(
                        item.quantity || 1
                      )}
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

              )
            )}

          </div>

          <div className="tracking-address">

            <h2>
              Delivery Address
            </h2>

            <p>
              <strong>
                {order.customer?.name}
              </strong>
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

        </div>

      </div>

    </div>
  );
}

export default TrackOrder;