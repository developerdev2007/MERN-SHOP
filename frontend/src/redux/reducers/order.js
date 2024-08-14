import { createReducer } from "@reduxjs/toolkit";

const initailState = {
  isLoading: true,
};

export const ordersReducer = createReducer(initailState, (builder) => {
  builder
    .addCase("getAllOrdersOfUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersOfUserSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
      state.success = true;
    })
    .addCase("getAllOrdersOfUserFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    ///!!!!!+++++++++++++++++++++++++++++++++++++++
    .addCase("getAllOrdersOfSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersOfSellerSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
      state.success = true;
    })
    .addCase("getAllOrdersOfSellerFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    ////// *** get admin orders of all for admin

    .addCase("getAdminAllOrdersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAdminAllOrdersSuccess", (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.adminOrders = action.payload;
    })
    .addCase("getAdminAllOrdersFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    });
});
