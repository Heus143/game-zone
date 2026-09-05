import { createSlice } from "@reduxjs/toolkit";

const savedOrders =
  JSON.parse(
    localStorage.getItem("orders")
  ) || [];

const ordersWithTimestamp =
  savedOrders.map((order) => ({
    ...order,

    placedAt:
      Number(order.placedAt) ||
      Date.now(),

    tracking: {
      ...order.tracking,

      currentStep:
        order.tracking?.currentStep ?? 0
    }
  }));

const initialState = {
  orders: ordersWithTimestamp
};

localStorage.setItem(
  "orders",
  JSON.stringify(ordersWithTimestamp)
);

const ordersSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {

    addOrder: (state, action) => {

      const order = {
        ...action.payload,

        placedAt:
          Number(
            action.payload.placedAt
          ) || Date.now(),

        tracking: {
          ...action.payload.tracking,

          currentStep: 0
        }
      };

      state.orders.push(order);

      localStorage.setItem(
        "orders",
        JSON.stringify(state.orders)
      );
    },

    setOrders: (state, action) => {

      state.orders =
        action.payload.map(
          (order) => ({
            ...order,

            placedAt:
              Number(order.placedAt) ||
              Date.now(),

            tracking: {
              ...order.tracking,

              currentStep:
                order.tracking
                  ?.currentStep ?? 0
            }
          })
        );

      localStorage.setItem(
        "orders",
        JSON.stringify(state.orders)
      );
    },

    updateOrder: (
      state,
      action
    ) => {

      const {
        orderId,
        currentStep,
        status
      } = action.payload;

      const order =
        state.orders.find(
          (item) =>
            String(item.id) ===
            String(orderId)
        );

      if (order) {

        order.status = status;

        if (order.tracking) {
          order.tracking.currentStep =
            currentStep;
        }
      }

      localStorage.setItem(
        "orders",
        JSON.stringify(state.orders)
      );
    },

    clearOrders: (state) => {

      state.orders = [];

      localStorage.removeItem(
        "orders"
      );
    }
  }
});

export const {
  addOrder,
  setOrders,
  updateOrder,
  clearOrders
} = ordersSlice.actions;

export default ordersSlice.reducer;