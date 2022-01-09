import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loading: false,
  error: null,
  category: 11,
};

export const fetchCategories = () => async (dispatch, getState) => {
  dispatch(fetchStart());
  try {
    const response = await fetch("http://localhost:7070/api/categories");
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

const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    put(state, action) {
      state.categories = [{ id: 11, title: "Все" }, ...action.payload];
    },
    fetchStart(state, action) {
      return { ...state, loading: true, error: null };
    },
    fetchError(state, action) {
      const { error } = action.payload;
      return { ...state, loading: false, error };
    },
    fetchSuccess(state, action) {
      return {
        ...state,
        loading: false,
        error: null,
      };
    },
    switchCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const { put, fetchStart, fetchError, fetchSuccess, switchCategory } =
  categories.actions;
export default categories.reducer;
