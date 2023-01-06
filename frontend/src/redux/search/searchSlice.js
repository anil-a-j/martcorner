import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCustomerSearchService,
  getShopSearchProductsService,
  getSearchFavoriteShopService,
} from "./searchServices";

const initialState = {
  customerSearchPending: "",
  customerSearchFulfilled: "",
  customerSearchRejected: "",
  shopSearchProductsPending: "",
  shopSearchProductsFulfilled: "",
  shopSearchProductsRejected: "",
  searchFavoriteShopPending: "",
  searchFavoriteShopFulfilled: "",
  searchFavoriteShopRejected: "",
};

export const getCustomerSearch = createAsyncThunk(
  "search/getcustomersearch",
  async (query) => {
    return await getCustomerSearchService(query);
  }
);

export const getShopSearchProducts = createAsyncThunk(
  "search/getshopsearchproducts",
  async (data) => {
    return await getShopSearchProductsService(data);
  }
);

export const getSearchFavoriteShop = createAsyncThunk(
  "search/getsearchfavoriteshop",
  async (data) => {
    return await getSearchFavoriteShopService(data);
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetValues: (state, action) => {
      state.customerSearchPending = "";
      state.customerSearchRejected = "";
      state.shopSearchProductsPending = "";
      state.shopSearchProductsRejected = "";
      state.searchFavoriteShopPending = "";
      state.searchFavoriteShopRejected = "";
    },
    clearCustomerSearch: (state, action) => {
      state.customerSearchFulfilled = "";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getCustomerSearch.pending, (state, action) => {
        state.customerSearchPending = "pending";
      })
      .addCase(getCustomerSearch.fulfilled, (state, action) => {
        state.customerSearchFulfilled = action.payload;
        state.customerSearchPending = "";
      })
      .addCase(getCustomerSearch.rejected, (state, action) => {
        state.customerSearchRejected = action.error.message;
        state.customerSearchPending = "";
      })
      .addCase(getShopSearchProducts.pending, (state, action) => {
        state.shopSearchProductsPending = "pending";
      })
      .addCase(getShopSearchProducts.fulfilled, (state, action) => {
        state.shopSearchProductsFulfilled = action.payload;
        state.shopSearchProductsPending = "";
      })
      .addCase(getShopSearchProducts.rejected, (state, action) => {
        state.shopSearchProductsRejected = action.error.message;
        state.shopSearchProductsPending = "";
      })
      .addCase(getSearchFavoriteShop.pending, (state, action) => {
        state.searchFavoriteShopPending = "pending";
      })
      .addCase(getSearchFavoriteShop.fulfilled, (state, action) => {
        state.searchFavoriteShopFulfilled = action.payload;
        state.searchFavoriteShopPending = "";
      })
      .addCase(getSearchFavoriteShop.rejected, (state, action) => {
        state.searchFavoriteShopRejected = action.error.message;
        state.searchFavoriteShopPending = "";
      }),
});

export const selectSearch = (state) => state.search;

// normal reducer actions export
export const { resetValues, clearCustomerSearch } = searchSlice.actions;

export default searchSlice.reducer;
