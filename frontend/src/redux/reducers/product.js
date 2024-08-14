import { createReducer } from "@reduxjs/toolkit";

const initailState = {
  isLoading: true,
  success: false,
};

export const productReducer = createReducer(initailState, (builder) => {
  builder
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
      state.success = false;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    // .addCase("clearError", (state) => {
    //   state.error = null;
    // })

    /// **dgetAll products of shop
    .addCase("getAllProductsRequestShop", (state) => {
      state.isLoading = true;
      state.success = false;
    })
    .addCase("getAllProductsSuccessShop", (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.success = true;
    })
    .addCase("getAllProductsFailedShop", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    /// **dgetAll products of all
    .addCase("getAllProductsRequest", (state) => {
      state.isLoading = true;
      state.success = false;
    })
    .addCase("getAllProductsSuccess", (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
      state.success = true;
    })
    .addCase("getAllProductsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    //**delete product of a shop */

    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true;
      state.success = false;
    })
    .addCase("deleteProductSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.success = true;
    })
    .addCase("deleteProductFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("clearError", (state) => {
      state.error = null;
      state.success = false;
      state.success = false;
    });
});
