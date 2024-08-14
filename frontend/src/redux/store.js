import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user.js";

import { sellerReducer } from "./reducers/shop.js";
import { productReducer } from "./reducers/product.js";
import { eventReducer } from "./reducers/event.js";
import { cartReducer } from "./reducers/cart.js";
import { wishListReducer } from "./reducers/wishList.js";
import { ordersReducer } from "./reducers/order.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
    events: eventReducer,
    cart: cartReducer,
    wishList: wishListReducer,
    orders: ordersReducer,
  },
});

export default store;
