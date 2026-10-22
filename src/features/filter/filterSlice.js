import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    number: "",
    brand: "",
  },
  reducers: {
    setNumber: (state, action) => {
      state.number = action.payload;
      state.brand = "";
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
  },
});

export const { setNumber, setBrand } = filterSlice.actions;

export default filterSlice.reducer;
