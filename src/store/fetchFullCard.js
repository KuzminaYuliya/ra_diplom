import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [],
  loading: false,
  error: null,
  size: "",
  amount: 1,
};

export const fetchFullCard = (id) => async (dispatch, getState) => {
  dispatch(fetchStart());

  try {
    const response = await fetch(`http://localhost:7070/api/items/${id}`);
    const json = await response.json();
    dispatch(put(json));
    dispatch(fetchSuccess());
  } catch (e) {
    dispatch(fetchError(e.message));
  }
};

const fullCard = createSlice({
  name: "fullCard",
  initialState,
  reducers: {
    put(state, action) {
      state.item = action.payload;
    },
    fetchStart(state, action) {
      return { ...state, loading: true };
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
    amountInc(state, action) {
      state.amount += 1;
    },
    amountDec(state, action) {
      state.amount -= 1;
    },
    chooseSize(state, action) {
      state.size = action.payload;
    },
  },
});

export const {
  put,
  fetchStart,
  fetchError,
  fetchSuccess,
  chooseSize,
  amountInc,
  amountDec,
} = fullCard.actions;
export default fullCard.reducer;
