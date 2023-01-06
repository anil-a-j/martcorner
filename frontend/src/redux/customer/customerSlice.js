import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signupAsCustomerService,
  loginAsCustomerService,
  logoutAsCustomerService,
  editCustomerService,
  deleteCustomerAccountService,
} from "./customerServices";

const customer = JSON.parse(localStorage.getItem("customerInfo"));

const initialState = {
  customerInfoPending: "",
  customerInfoFulfilled: customer ? customer : "",
  customerInfoRejected: "",
  editCustomerPending: null,
  editCustomerFulfilled: null,
  editCustomerRejected: "",
  deleteCustomerPending: "",
  deleteCustomerFulfilled: "",
  deleteCustomerRejected: "",
};

export const signupAsCustomer = createAsyncThunk(
  "customer/signupascustomer",
  async (data) => {
    return await signupAsCustomerService(data);
  }
);

export const loginAsCustomer = createAsyncThunk(
  "customer/loginascustomer",
  async (data) => {
    return await loginAsCustomerService(data);
  }
);

export const logoutAsCustomer = createAsyncThunk(
  "customer/logoutascustomer",
  async () => {
    return await logoutAsCustomerService();
  }
);

export const editCustomer = createAsyncThunk(
  "customer/editcustomerservice",
  async (data) => {
    return await editCustomerService(data);
  }
);

export const deleteCustomerAccount = createAsyncThunk(
  "customer/deletecustomeraccount",
  async (data) => {
    return await deleteCustomerAccountService(data);
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    resetValuesCustomer: (state, action) => {
      state.customerInfoRejected = "";
      state.editCustomerRejected = "";
      state.deleteCustomerRejected = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsCustomer.pending, (state, action) => {
        state.customerInfoPending = "pending";
      })
      .addCase(signupAsCustomer.fulfilled, (state, action) => {
        state.customerInfoFulfilled = action.payload;
        state.customerInfoPending = "";
      })
      .addCase(signupAsCustomer.rejected, (state, action) => {
        state.customerInfoRejected = action.error.message;
        state.customerInfoPending = "";
      })
      .addCase(loginAsCustomer.pending, (state) => {
        state.customerInfoPending = "pending";
      })
      .addCase(loginAsCustomer.fulfilled, (state, action) => {
        state.customerInfoFulfilled = action.payload;
        state.customerInfoPending = "";
      })
      .addCase(loginAsCustomer.rejected, (state, action) => {
        state.customerInfoRejected = action.error.message;
        state.customerInfoPending = "";
      })
      .addCase(logoutAsCustomer.fulfilled, (state) => {
        state.customerInfoFulfilled = "";
      })
      .addCase(logoutAsCustomer.rejected, (state, action) => {
        state.customerError = action.error.message;
      })
      .addCase(editCustomer.pending, (state, action) => {
        state.editCustomerPending = "pending";
      })
      .addCase(editCustomer.fulfilled, (state, action) => {
        state.editCustomerPending = "";
        state.editCustomerFulfilled = "fulfilled";
        state.customerInfoFulfilled = action.payload;
      })
      .addCase(editCustomer.rejected, (state, action) => {
        state.editCustomerRejected = action.error.message;
        state.editCustomerPending = "";
      })
      .addCase(deleteCustomerAccount.pending, (state, action) => {
        state.customerInfoPending = "pending";
      })
      .addCase(deleteCustomerAccount.fulfilled, (state, action) => {
        state.customerInfoFulfilled = "";
        state.customerInfoPending = "";
      })
      .addCase(deleteCustomerAccount.rejected, (state, action) => {
        state.deleteCustomerRejected = action.error.message;
        state.customerInfoPending = "";
      });
  },
});

export const selectCustomer = (state) => state.customer;

export const { resetValuesCustomer } = customerSlice.actions;

export default customerSlice.reducer;
