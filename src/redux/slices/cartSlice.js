import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || []
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {

    addToCart: (state, action) => {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity =
          Number(existingProduct.quantity || 1) + 1;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1
        });
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity =
          Number(item.quantity || 1) + 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity = Math.max(
          1,
          Number(item.quantity || 1) - 1
        );
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.cart = [];
    }
  }
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;