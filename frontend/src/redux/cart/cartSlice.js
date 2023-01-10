import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  addItemPopup: false,
  currentItemToList: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openAddItemPopup: (state, action) => {
      state.addItemPopup = true;
      state.currentItemToList = action.payload;
    },
    closeAddItemPopup: (state, action) => {
      state.addItemPopup = false;
      state.currentItemToList = "";
    },
  },
});

export const selectCart = (state) => state.cart;

export const { openAddItemPopup, closeAddItemPopup } = cartSlice.actions;

export default cartSlice.reducer;
