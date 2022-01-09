import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchInput: "",
  hidden: true,
};

const searchField = createSlice({
  name: "searchField",
  initialState,
  reducers: {
    changeSearchField(state, action) {
      state.searchInput = action.payload;
    },
    changeSearchFieldVisibility(state, action) {
      state.hidden = action.payload;
    },
  },
});

export const { changeSearchField, changeSearchFieldVisibility } =
  searchField.actions;
export default searchField.reducer;
