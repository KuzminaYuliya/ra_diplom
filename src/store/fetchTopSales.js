import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchTopSales = () => async (dispatch, getState) => {
  dispatch(fetchStart());
  try {
    const response = await fetch("http://localhost:7070/api/top-sales");
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(put(data));
    dispatch(fetchSuccess());
  } catch (e) {
    dispatch(fetchError(e.message));
  }
};

const topSales = createSlice({
  name: "topSales",
  initialState,
  reducers: {
    put(state, action) {
      state.items = action.payload;
    },
    fetchStart(state, action) {
      return { ...state, items: [], loading: true, error: null };
    },
    fetchError(state, action) {
      const { error } = action.payload;
      return { ...state, items: [], loading: false, error };
    },
    fetchSuccess(state, action) {
      return { ...state, loading: false, error: null };
    },
  },
});

export const { put, fetchStart, fetchError, fetchSuccess } = topSales.actions;
export default topSales.reducer;
