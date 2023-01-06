import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signupAsShopService,
  loginAsShopService,
  logoutAsShopService,
  editShopService,
  deleteShopAccountService,
  getShopPageService,
} from "./shopServices";

const shop = JSON.parse(localStorage.getItem("shopInfo"));

const initialState = {
  shopInfoPending: "",
  shopInfoFulfilled: shop ? shop : null,
  shopInfoRejected: "",
  editShopPending: null,
  editShopFulfilled: null,
  editShopRejected: "",
  deleteShopPending: "",
  deleteShopFulfilled: "",
  deleteShopRejected: "",
  shopPagePending: "",
  shopPageFulfilled: "",
  shopPageRejected: "",
};

export const signupAsShop = createAsyncThunk(
  "shop/signupasshop",
  async (data) => {
    return await signupAsShopService(data);
  }
);

export const loginAsShop = createAsyncThunk(
  "shop/loginasshop",
  async (data) => {
    return await loginAsShopService(data);
  }
);

export const logoutAsShop = createAsyncThunk("user/logoutasshop", async () => {
  return await logoutAsShopService();
});

export const editShop = createAsyncThunk(
  "shop/editshopservice",
  async (data) => {
    return await editShopService(data);
  }
);

export const deleteShopAccount = createAsyncThunk(
  "shop/deleteshopaccount",
  async (data) => {
    return await deleteShopAccountService(data);
  }
);

export const getShopPage = createAsyncThunk(
  "shop/getshoppage",
  async (data) => {
    return await getShopPageService(data);
  }
);

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    resetValuesShop: (state, action) => {
      state.shopInfoRejected = "";
      state.editShopRejected = "";
      state.deleteShopRejected = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsShop.pending, (state, action) => {
        state.shopInfoPending = "pending";
      })
      .addCase(signupAsShop.fulfilled, (state, action) => {
        state.shopInfoFulfilled = action.payload;
        state.shopInfoPending = "";
      })
      .addCase(signupAsShop.rejected, (state, action) => {
        state.shopInfoRejected = action.error.message;
        state.shopInfoPending = "";
      })
      .addCase(loginAsShop.pending, (state) => {
        state.shopInfoPending = "pending";
      })
      .addCase(loginAsShop.fulfilled, (state, action) => {
        state.shopInfoFulfilled = action.payload;
        state.shopInfoPending = "";
      })
      .addCase(loginAsShop.rejected, (state, action) => {
        state.shopInfoRejected = action.error.message;
        state.shopInfoPending = "";
      })
      .addCase(logoutAsShop.fulfilled, (state) => {
        state.shopInfoFulfilled = "";
      })
      .addCase(logoutAsShop.rejected, (state, action) => {
        state.shopError = action.error.message;
      })
      .addCase(editShop.pending, (state, action) => {
        state.editShopPending = "pending";
      })
      .addCase(editShop.fulfilled, (state, action) => {
        state.editShopPending = "";
        state.editShopFulfilled = "fulfilled";
        state.shopInfoFulfilled = action.payload;
      })
      .addCase(editShop.rejected, (state, action) => {
        state.editShopRejected = action.error.message;
        state.editShopPending = "";
      })
      .addCase(deleteShopAccount.pending, (state, action) => {
        state.deleteShopPending = "pending";
      })
      .addCase(deleteShopAccount.fulfilled, (state, action) => {
        state.shopInfoFulfilled = "";
        state.deleteShopPending = "";
        state.deleteShopFulfilled = action.payload;
      })
      .addCase(deleteShopAccount.rejected, (state, action) => {
        state.deleteShopRejected = action.error.message;
        state.deleteShopPending = "";
      })
      .addCase(getShopPage.pending, (state, action) => {
        state.shopPagePending = "pending";
      })
      .addCase(getShopPage.fulfilled, (state, action) => {
        state.shopPageFulfilled = action.payload;
        state.shopPagePending = "";
      })
      .addCase(getShopPage.rejected, (state, action) => {
        state.shopPageRejected = action.error.message;
        state.shopPagePending = "";
      });
  },
});

export const selectShop = (state) => state.shop;

export const { resetValuesShop } = shopSlice.actions;

export default shopSlice.reducer;
