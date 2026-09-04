import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/admin.css";

function Dashboard() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const statuses = [
    "Placed",
    "Confirmed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered"
  ];

  const trackingSteps = [
    {
      title: "Order Placed",
      description:
        "Your order has been successfully placed."
    },
    {
      title: "Order Confirmed",
      description:
        "Your order has been confirmed."
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

  useEffect(() => {
    const savedOrders =
      JSON.parse(
        localStorage.getItem("orders")
      ) || [];

    setOrders(savedOrders);
  }, []);

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  const createTracking = (status) => {
    const statusIndex =
      statuses.indexOf(status);

    return {
      currentStep:
        statusIndex >= 0
          ? statusIndex
          : 0,

      steps: trackingSteps.map(
        (step, index) => ({
          ...step,
          completed:
            index <= statusIndex
        })
      )
    };
  };

  const updateOrderStatus = (
    orderId,
    newStatus
  ) => {
    const updatedOrders = orders.map(
      (order) => {
        if (order.id !== orderId) {
          return order;
        }

        return {
          ...order,
          status: newStatus,
          tracking:
            createTracking(newStatus)
        };
      }
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );
  };

  const totalOrders = orders.length;

  const pendingOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        order.status !== "Delivered"
    ).length;
  }, [orders]);

  const shippedOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        order.status === "Shipped" ||
        order.status ===
          "Out for Delivery"
    ).length;
  }, [orders]);

  const deliveredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        order.status === "Delivered"
    ).length;
  }, [orders]);

  const totalRevenue = useMemo(() => {
    return orders.reduce(
      (total, order) =>
        total +
        Number(order.total || 0),
      0
    );
  }, [orders]);

  return (
    <div className="admin-dashboard">

      <div className="dashboard-header">

        <div>

          <p>
            GAMEZONE
          </p>

          <h1>
            Admin Dashboard
          </h1>

        </div>

        <button
          className="admin-logout"
          onClick={logout}
        >
          Logout
        </button>

      </div>

      <div className="dashboard-stats">

        <div className="dashboard-stat-card">
          <span>
            Total Orders
          </span>

          <strong>
            {totalOrders}
          </strong>
        </div>

        <div className="dashboard-stat-card">
          <span>
            Pending Orders
          </span>

          <strong>
            {pendingOrders}
          </strong>
        </div>

        <div className="dashboard-stat-card">
          <span>
            Shipped Orders
          </span>

          <strong>
            {shippedOrders}
          </strong>
        </div>

        <div className="dashboard-stat-card">
          <span>
            Delivered
          </span>

          <strong>
            {deliveredOrders}
          </strong>
        </div>

        <div className="dashboard-stat-card">
          <span>
            Total Revenue
          </span>

          <strong>
            ₹
            {totalRevenue.toLocaleString(
              "en-IN"
            )}
          </strong>
        </div>

      </div>

      <div className="dashboard-card">

        <h2>
          User Management
        </h2>

        <p>
          Manage registered users from here.
        </p>

        <Link to="/admin/users">
          Manage Users
        </Link>

      </div>

      <div className="admin-orders-section">

        <div className="admin-section-header">

          <div>

            <p>
              ORDER MANAGEMENT
            </p>

            <h2>
              Customer Orders
            </h2>

          </div>

        </div>

        {orders.length === 0 ? (

          <div className="admin-no-orders">

            <div>
              🎮
            </div>

            <h3>
              No Orders Yet
            </h3>

            <p>
              Customer orders will
              appear here.
            </p>

          </div>

        ) : (

          <div className="admin-orders-list">

            {[...orders]
              .reverse()
              .map((order) => {

                const currentStatus =
                  order.status ||
                  "Placed";

                return (
                  <div
                    className="admin-order-card"
                    key={order.id}
                  >

                    <div className="admin-order-top">

                      <div>

                        <span>
                          ORDER
                        </span>

                        <h3>
                          #{order.id}
                        </h3>

                        <p>
                          {order.date}
                        </p>

                      </div>

                      <div className="admin-status-control">

                        <label>
                          Order Status
                        </label>

                        <select
                          value={
                            currentStatus
                          }
                          onChange={(e) =>
                            updateOrderStatus(
                              order.id,
                              e.target.value
                            )
                          }
                        >

                          {statuses.map(
                            (status) => (

                              <option
                                key={status}
                                value={status}
                              >
                                {status}
                              </option>

                            )
                          )}

                        </select>

                      </div>

                    </div>

                    <div className="admin-order-content">

                      <div className="admin-customer">

                        <h4>
                          Customer Details
                        </h4>

                        <p>
                          <strong>
                            Name:
                          </strong>{" "}
                          {order.customer?.name ||
                            "N/A"}
                        </p>

                        <p>
                          <strong>
                            Phone:
                          </strong>{" "}
                          {order.customer?.phone ||
                            "N/A"}
                        </p>

                        <p>
                          <strong>
                            Address:
                          </strong>{" "}
                          {order.customer?.address ||
                            "N/A"}
                        </p>

                        <p>
                          {order.customer?.city ||
                            ""}
                          ,{" "}
                          {order.customer?.state ||
                            ""}{" "}
                          -{" "}
                          {order.customer?.pincode ||
                            ""}
                        </p>

                      </div>

                      <div className="admin-order-items">

                        <h4>
                          Products
                        </h4>

                        {order.items?.map(
                          (item) => (

                            <div
                              className="admin-order-item"
                              key={item.id}
                            >

                              <div>

                                <strong>
                                  {item.name}
                                </strong>

                                <span>
                                  Qty:{" "}
                                  {Number(
                                    item.quantity ||
                                      1
                                  )}
                                </span>

                              </div>

                              <strong>
                                ₹
                                {(
                                  Number(
                                    item.price ||
                                      0
                                  ) *
                                  Number(
                                    item.quantity ||
                                      1
                                  )
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </strong>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                    <div className="admin-order-bottom">

                      <div>

                        <span>
                          Current Status
                        </span>

                        <strong>
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
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>

                      <Link
                        to={`/track-order/${order.id}`}
                        className="admin-track-link"
                      >
                        View Tracking
                      </Link>

                    </div>

                  </div>
                );
              })}

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;