import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getStoreTypesService,
  getStatesService,
  getDistrictsService,
  addFeedbackService,
  passwordResetService,
  securityCodeCheckService,
  createNewPasswordService,
  addToFavoriteShopService,
  removeFromFavoriteShopService,
} from "./miscServices";

const customer = JSON.parse(localStorage.getItem("customerInfo"));
const shop = JSON.parse(localStorage.getItem("shopInfo"));

const initialState = {
  storesPending: "",
  storesFulfilled: "",
  storesRejected: "",
  statesPending: "",
  statesFulfilled: "",
  statesRejected: "",
  districtsPending: "",
  districtsFulfilled: "",
  districtsRejected: "",
  forgetUser: customer ? false : shop ? false : true,
  addFeedbackPending: "",
  addFeedbackFulfilled: "",
  addFeedbackRejected: "",
  passwordResetFulfilled: "",
  passwordResetPending: "",
  passwordResetRejected: "",
  securityCodeCheckFulfilled: "",
  securityCodeCheckPending: "",
  securityCodeCheckRejected: "",
  createNewPasswordPending: "",
  createNewPasswordFulfilled: "",
  createNewPasswordRejected: "",
  addToFavoriteShopPending: "",
  addToFavoriteShopFulfilled: "",
  addToFavoriteShopRejected: "",
  removeFromFavoriteShopPending: "",
  removeFromFavoriteShopFulfilled: "",
  removeFromFavoriteShopRejected: "",
};

export const getStoreTypes = createAsyncThunk("misc/getstores", async () => {
  return await getStoreTypesService();
});

export const getStates = createAsyncThunk("misc/getstates", async (id) => {
  return await getStatesService(id);
});

export const getDistricts = createAsyncThunk(
  "misc/getdistricts",
  async (id) => {
    return await getDistrictsService(id);
  }
);

export const addFeedback = createAsyncThunk(
  "misc/addfeedback",
  async (data) => {
    return await addFeedbackService(data);
  }
);

export const passwordReset = createAsyncThunk(
  "misc/passwordreset",
  async (data) => {
    return await passwordResetService(data);
  }
);

export const securityCodeCheck = createAsyncThunk(
  "misc/securitycodecheck",
  async (data) => {
    return await securityCodeCheckService(data);
  }
);

export const createNewPassword = createAsyncThunk(
  "misc/createnewpassword",
  async (data) => {
    return await createNewPasswordService(data);
  }
);

export const addToFavoriteShop = createAsyncThunk(
  "misc/addtofavoriteshop",
  async (data) => {
    return await addToFavoriteShopService(data);
  }
);

export const removeFromFavoriteShop = createAsyncThunk(
  "misc/removefromfavoriteshop",
  async (data) => {
    return await removeFromFavoriteShopService(data);
  }
);

export const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    clearStatesAndDistricts: (state) => {
      state.states = "";
      state.districts = "";
    },
    clearCredentials: (state, action) => {
      state.forgetUser = action.payload;
    },
    clearFeedback: (state, action) => {
      state.addFeedbackFulfilled = "";
      state.addFeedbackRejected = "";
    },
    clearPasswordReset: (state, action) => {
      state.passwordResetFulfilled = "";
      state.passwordResetRejected = "";
    },
    clearSecurityCodeCheck: (state, action) => {
      state.securityCodeCheckFulfilled = "";
      state.securityCodeCheckRejected = "";
    },
    clearCreateNewPassword: (state, action) => {
      state.createNewPasswordFulfilled = "";
      state.createNewPasswordRejected = "";
    },
    clearAddToFavoriteShop: (state, action) => {
      state.addToFavoriteShopFulfilled = "";
      state.addToFavoriteShopRejected = "";
    },
    clearRemoveFromFavoriteShop: (state, action) => {
      state.removeFromFavoriteShopFulfilled = "";
      state.removeFromFavoriteShopRejected = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStoreTypes.pending, (state, action) => {
        state.storesPending = "pending";
      })
      .addCase(getStoreTypes.fulfilled, (state, action) => {
        state.storesFulfilled = action.payload;
        state.storesPending = "";
      })
      .addCase(getStoreTypes.rejected, (state, action) => {
        state.storesRejected = action.error.message;
        state.storesPending = "";
      })
      .addCase(getStates.pending, (state, action) => {
        state.statesPending = "pending";
      })
      .addCase(getStates.fulfilled, (state, action) => {
        state.statesFulfilled = action.payload;
        state.statesPending = "";
      })
      .addCase(getStates.rejected, (state, action) => {
        state.statesRejected = action.error.message;
        state.statesPending = "";
      })
      .addCase(getDistricts.pending, (state, action) => {
        state.districtsPending = "pending";
      })
      .addCase(getDistricts.fulfilled, (state, action) => {
        state.districtsFulfilled = action.payload;
        state.districtsPending = "";
      })
      .addCase(getDistricts.rejected, (state, action) => {
        state.districtsRejected = action.error.message;
        state.districtsPending = "";
      })
      .addCase(addFeedback.pending, (state, action) => {
        state.addFeedbackPending = "pending";
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.addFeedbackFulfilled = action.payload;
        state.addFeedbackPending = "";
      })
      .addCase(addFeedback.rejected, (state, action) => {
        state.addFeedbackRejected = action.error.message;
        state.addFeedbackPending = "";
      })
      .addCase(passwordReset.pending, (state, action) => {
        state.passwordResetPending = "pending";
      })
      .addCase(passwordReset.fulfilled, (state, action) => {
        state.passwordResetFulfilled = action.payload;
        state.passwordResetPending = "";
      })
      .addCase(passwordReset.rejected, (state, action) => {
        state.passwordResetRejected = action.error.message;
        state.passwordResetPending = "";
      })
      .addCase(securityCodeCheck.pending, (state, action) => {
        state.securityCodeCheckPending = "pending";
      })
      .addCase(securityCodeCheck.fulfilled, (state, action) => {
        state.securityCodeCheckFulfilled = action.payload;
        state.securityCodeCheckPending = "";
      })
      .addCase(securityCodeCheck.rejected, (state, action) => {
        state.securityCodeCheckRejected = action.error.message;
        state.securityCodeCheckPending = "";
      })
      .addCase(createNewPassword.pending, (state, action) => {
        state.createNewPasswordPending = "pending";
      })
      .addCase(createNewPassword.fulfilled, (state, action) => {
        state.createNewPasswordFulfilled = action.payload;
        state.createNewPasswordPending = "";
      })
      .addCase(createNewPassword.rejected, (state, action) => {
        state.createNewPasswordRejected = action.error.message;
        state.createNewPasswordPending = "";
      })
      .addCase(addToFavoriteShop.pending, (state, action) => {
        state.addToFavoriteShopPending = "pending";
      })
      .addCase(addToFavoriteShop.fulfilled, (state, action) => {
        state.addToFavoriteShopFulfilled = action.payload;
        state.addToFavoriteShopPending = "";
      })
      .addCase(addToFavoriteShop.rejected, (state, action) => {
        state.addToFavoriteShopRejected = action.error.message;
        state.addToFavoriteShopPending = "";
      })
      .addCase(removeFromFavoriteShop.pending, (state, action) => {
        state.removeFromFavoriteShopPending = "pending";
      })
      .addCase(removeFromFavoriteShop.fulfilled, (state, action) => {
        state.removeFromFavoriteShopFulfilled = action.payload;
        state.removeFromFavoriteShopPending = "";
      })
      .addCase(removeFromFavoriteShop.rejected, (state, action) => {
        state.removeFromFavoriteShopRejected = action.error.message;
        state.removeFromFavoriteShopPending = "";
      });
  },
});

export const selectMisc = (state) => state.misc;

export const {
  clearStatesAndDistricts,
  clearCredentials,
  clearFeedback,
  clearPasswordReset,
  clearSecurityCodeCheck,
  clearCreateNewPassword,
  clearAddToFavoriteShop,
  clearRemoveFromFavoriteShop,
} = miscSlice.actions;

export default miscSlice.reducer;
