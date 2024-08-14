import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  message: null,
  adminUsers: [],
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    })
    .addCase("LoadUserFailure", (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })

    //!---------Update users ------

    .addCase("updateUserInfoRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("updateUserInfoSuccess", (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase("updateUserInfoFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    ///!!------- Update user address----------------------

    .addCase("updateUserAddressRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("updateUserAddressSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    })
    .addCase("updateUserAddressFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    //////////!!!-------- delete user address

    .addCase("deleteUserAddressRequest", (state) => {
      state.isLoading = true;
      state.message = "";
    })
    .addCase("deleteUserAddressSuccess", (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      state.message = action.payload;
    })
    .addCase("deleteUserAddressFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // ! get admin All users

    .addCase("getAdminAllUsersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAdminAllUsersSuccess", (state, action) => {
      state.isLoading = false;
      state.adminUsers = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    })
    .addCase("getAdminAllUsersFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.adminUsers = [];
    })

    .addCase("clearErrors", (state) => {
      state.error = null;
      state.isLoading = false;
    })
    .addCase("clearMessage", (state) => {
      state.message = null;
      state.isLoading = false;
    })
    .addDefaultCase((state) => state);
});
