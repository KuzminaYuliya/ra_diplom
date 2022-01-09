import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
  disabled: false,
  hidden: false,
  loadingMore: false,
};

export const fetchCatalog = (id, inputValue) => async (dispatch, getState) => {
  dispatch(fetchStart());

  let baseURL = "http://localhost:7070/api/items?";
  let url;
  if (id !== 11) {
    url = `${baseURL}categoryId=${id}`;
  } else {
    url = baseURL;
  }
  if (inputValue.trim() !== "") {
    url = `${baseURL}q=${inputValue}`;
  }

  try {
    const response = await fetch(url);
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

export const fetchLoadMoreItems = (id, inputValue) => async (dispatch) => {
  dispatch(fetchMoreStart());

  let baseURL = "http://localhost:7070/api/items?";
  let url;
  if (id !== 11) {
    url = `${baseURL}categoryId=${id}&offset=6`;
  } else {
    url = `${baseURL}offset=6`;
  }
  if (inputValue.trim() !== "") {
    url = `${baseURL}q=${inputValue}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    dispatch(push(data));

    data.length < 6 ? dispatch(fetchMoreHide()) : dispatch(fetchMoreSuccess());
  } catch (e) {
    throw new Error(e.message);
  }
};

const catalog = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    
    put(state, action) {
      state.items = action.payload;
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

    push(state, action) {
      action.payload.forEach((item) => state.items.push(item));
    },
    fetchMoreStart(state, action) {
      return { ...state, disabled: true, loadingMore: true };
    },
    fetchMoreSuccess(state, action) {
      return { ...state, disabled: false, hidden: false, loadingMore: false };
    },
    fetchMoreHide(state, action) {
      return { ...state, disabled: false, hidden: true, loadingMore: false };
    },
  },
});

export const {
  put,
  fetchStart,
  fetchError,
  fetchSuccess,
  push,
  fetchMoreStart,
  fetchMoreSuccess,
  fetchMoreHide,
} = catalog.actions;
export default catalog.reducer;
