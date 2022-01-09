import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStore = () =>
  localStorage.cart ? JSON.parse(localStorage.getItem("cart")) : [];

const initialState = {
  items: loadCartFromStore(),
};

export const addToCart = (item) => async (dispatch, getState) => {
  let isInCart = false;
  if (localStorage.length === 0) {
    localStorage.setItem("cart", JSON.stringify([item]));
  } else {
    const cart = await JSON.parse(localStorage.getItem("cart"));
    cart.forEach((el) => {
      if (el.id === item.id && el.size === item.size) {
        el.amount += item.amount;
        isInCart = true;
      }
    });
    if (!isInCart) {
      cart.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  dispatch(updateCart());
};

export const deleteFromCart = (id) => async (dispatch, getState) => {
  const cart = await JSON.parse(localStorage.getItem("cart"));
  const filteredCart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(filteredCart));
  dispatch(updateCart());
};

const cartState = createSlice({
  name: "cartState",
  initialState,
  reducers: {
    updateCart(state, action) {
      state.items = loadCartFromStore();
    },
  },
});

export const { updateCart } = cartState.actions;
export default cartState.reducer;
