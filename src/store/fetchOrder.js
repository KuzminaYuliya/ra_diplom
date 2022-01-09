import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../store/cartReducer";

const initialState = {
  owner: { phone: "", address: "" },
  loading: false,
  success: false,
  checked: false,
  error: null,
};

export const fetchOrder = (owner, itemsData) => async (dispatch, getState) => {
  dispatch(fetchStart());

  const items = [
    ...itemsData.map((item) => {
      const { id, price, amount } = item;
      return { id, price, count: amount };
    }),
  ];
  const orderObj = { owner, items };

  try {
    const response = await fetch("http://localhost:7070/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderObj),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    localStorage.clear();
    dispatch(fetchSuccess());
    dispatch(updateCart());
  } catch (e) {
    dispatch(fetchError(e.message));
  }
};

const orderState = createSlice({
  name: "orderState",
  initialState,
  reducers: {
    fetchStart(state, action) {
      state.loading = true;
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.success = true;
    },
    fetchError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    changeInputField(state, action) {
      const { name, value } = action.payload;
      state.owner[name] = value;
    },
    changeCheckbox(state, action) {
      state.checked = action.payload;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchError,
  changeInputField,
  changeCheckbox,
} = orderState.actions;
export default orderState.reducer;
