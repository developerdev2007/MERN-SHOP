import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishList: localStorage.getItem("wishListItems")
    ? JSON.parse(localStorage.getItem("wishListItems"))
    : [],
};

export const wishListReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToWishlist", (state, action) => {
      const item = action.payload;
      const isItemExists = state.wishList.find((i) => i._id === item._id);

      if (isItemExists) {
        return {
          ...state,
          wishList: state.wishList.map((i) => (isItemExists._id ? item : i)),
        };
      } else {
        return {
          ...state,
          wishList: [...state.wishList, item],
        };
      }
    })
    .addCase("removeFromWishList", (state, action) => {
      return {
        ...state,
        wishList: state.wishList.filter((i) => i._id !== action.payload._id),
      };
    });
});
