import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isSeller: false,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase("LoadSellerFailure", (state, action) => {
      state.isLoading = false;
      state.isSeller = false;
      state.seller = action.payload;
    })

    ///!  for admin  only
    .addCase("adminAllSellersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("adminAllSellersSuccess", (state, action) => {
      state.isLoading = false;
      state.adminSellers = action.payload;
    })
    .addCase("adminAllSellersFailure", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
