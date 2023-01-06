import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getReviewsService, addReviewService } from "./reviewServices";

const initialState = {
  loadReviewsPending: "",
  loadReviewsFulfilled: "",
  loadReviewsRejected: "",
  addReviewPending: "",
  addReviewFulfilled: "",
  addReviewRejected: "",
};

export const getReviews = createAsyncThunk("shop/getreviews", async (data) => {
  return await getReviewsService(data);
});

export const addReview = createAsyncThunk("shop/addreview", async (data) => {
  return await addReviewService(data);
});

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    resetReviewValues: (state, action) => {
      state.addReviewFulfilled = "";
      state.addReviewRejected = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state, action) => {
        state.loadReviewsPending = "pending";
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loadReviewsFulfilled = action.payload;
        state.loadReviewsPending = "";
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loadReviewsRejected = action.error.message;
        state.loadReviewsPending = "";
      })
      .addCase(addReview.pending, (state, action) => {
        state.addReviewPending = "pending";
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.addReviewFulfilled = action.payload;
        state.addReviewPending = "";
      })
      .addCase(addReview.rejected, (state, action) => {
        state.addReviewRejected = action.error.message;
        state.addReviewPending = "";
      });
  },
});

export const selectReview = (state) => state.review;

export const { resetReviewValues } = reviewSlice.actions;

export default reviewSlice.reducer;
