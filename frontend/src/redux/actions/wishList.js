//!!*******---------Add to Wish List-----------------///
export const addToWishlist = (data) => (dispatch, getState) => {
  dispatch({
    type: "addToWishlist",
    payload: data,
  });

  localStorage.setItem(
    "wishListItems",
    JSON.stringify(getState().wishList.wishList)
  );
  return data;
};

export const removeFromWishList = (data) => (dispatch, getState) => {
  dispatch({
    type: "removeFromWishList",
    payload: data,
  });

  localStorage.setItem(
    "wishListItems",
    JSON.stringify(getState().wishList.wishList)
  );
  return data;
};
