import { configureStore } from "@reduxjs/toolkit";

import userReducer, { User } from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";
import { CartType } from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export type StoreState = {
  user: User;
  cart: CartType;
};

export default store;
