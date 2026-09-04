import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:
    JSON.parse(
      localStorage.getItem("loggedInUser")
    ) || null
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    loginUser: (state, action) => {
      state.user = action.payload;

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(action.payload)
      );
    },

    logoutUser: (state) => {
      state.user = null;

      localStorage.removeItem(
        "loggedInUser"
      );
    },

    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload
      };

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(state.user)
      );
    }
  }
});

export const {
  loginUser,
  logoutUser,
  updateUser
} = authSlice.actions;

export default authSlice.reducer;