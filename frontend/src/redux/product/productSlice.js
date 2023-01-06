import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProductService,
  editProductService,
  checkProductIdService,
  deleteProductService,
} from "./productServices";

const initialState = {
  addProductStatusPending: "",
  addProductStatusFulfilled: "",
  addProductStatusRejected: "",
  editProductStatusPending: "",
  editProductStatusFulfilled: "",
  editProductStatusRejected: "",
  shopProductsPending: "",
  shopProductsFulfilled: "",
  shopProductsRejected: "",
  idStatusPending: "",
  idStatusFulfilled: "",
  idStatusRejected: "",
  deleteProductPending: "",
  deleteProductFulfilled: "",
  deleteProductRejected: "",
};

export const addProduct = createAsyncThunk(
  "product/addproduct",
  async (data) => {
    return await addProductService(data);
  }
);

export const editProduct = createAsyncThunk(
  "product/editproduct",
  async (data) => {
    return await editProductService(data);
  }
);

export const checkProductId = createAsyncThunk(
  "product/checkproductid",
  async (data) => {
    return await checkProductIdService(data);
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteproduct",
  async (data) => {
    return await deleteProductService(data);
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetValues: (state, action) => {
      state.addProductStatusFulfilled = "";
      state.addProductStatusRejected = "";
      state.editProductStatusFulfilled = "";
      state.editProductStatusRejected = "";
      state.shopProductsRejected = "";
      state.idStatusFulfilled = "";
      state.idStatusRejected = "";
    },
    resetDeleteValues: (state, action) => {
      state.deleteProductFulfilled = "";
      state.deleteProductRejected = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state, action) => {
        state.addProductStatusPending = "pending";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addProductStatusFulfilled = action.payload;
        state.addProductStatusPending = "";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProductStatusRejected = action.error.message;
        state.addProductStatusPending = "";
      })
      .addCase(editProduct.pending, (state, action) => {
        state.editProductStatusPending = "pending";
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.editProductStatusFulfilled = action.payload;
        state.editProductStatusPending = "";
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.editProductStatusRejected = action.error.message;
        state.editProductStatusPending = "";
      })
      .addCase(checkProductId.pending, (state, action) => {
        state.idStatusPending = "pending";
      })
      .addCase(checkProductId.fulfilled, (state, action) => {
        state.idStatusFulfilled = action.payload;
        state.idStatusPending = "";
      })
      .addCase(checkProductId.rejected, (state, action) => {
        state.idStatusRejected = action.error.message;
        state.idStatusPending = "";
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.deleteProductPending = "pending";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteProductFulfilled = action.payload;
        state.deleteProductPending = "";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProductRejected = action.error.message;
        state.shopProductsPending = "";
      });
  },
});

export const selectProduct = (state) => state.product;

// normal reducer actions
export const { resetValues, resetDeleteValues } = productSlice.actions;

export default productSlice.reducer;
