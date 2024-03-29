import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "./Cart";

type CartType = {
  cart: Cart[];
};

const initialState: CartType = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart = [...state.cart, action.payload];
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      if (item) {
        item.quantity += 1;
        item.totalPrice = item?.quantity * item?.unitPrice;
      }
    },
    decreaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      if (item) {
        item.quantity -= 1;
        item.totalPrice = item?.quantity * item?.unitPrice;
      }

      if (item?.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalPrice = (state) => {
  return state.cart.cart.reduce((acc, curr) => acc + curr.totalPrice, 0);
};

export const getTotalQuantity = (state) => {
  return state.cart.cart.reduce((acc, curr) => acc + curr.quantity, 0);
};

export const getCart = (state) => {
  return state.cart.cart;
};

export const getCurrentQuantityById = (id: number) => (state) => {
  return (
    state.cart.cart.find((item: Cart) => item.pizzaId === id)?.quantity ?? 0
  );
};
