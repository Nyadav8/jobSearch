import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterState: {
    filtername: "",
    filterexp: "",
    filterloc: "",
    filtersal: "",
    filterrole: "",
    filterpay: "",
  },
};

const filterSetter = createSlice({
  name: "filterSetter",
  initialState,
  reducers: {
    updateFlters(state, action) {
      console.log(action);
      state.filterState = action.payload;
    },
  },
});

export const { updateFlters } = filterSetter.actions;

export default filterSetter.reducer;
