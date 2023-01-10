import { configureStore } from "@reduxjs/toolkit";
import customerSliceReducer from "./customer/customerSlice";
import shopSliceReducer from "./shop/shopSlice";
import miscSliceReducer from "./misc/miscSlice";
import searchSliceReducer from "./search/searchSlice";
import productSliceReducer from "./product/productSlice";
import reviewSliceReducer from "./review/reviewSlice";
import cartSliceReducer from "./cart/cartSlice";

export default configureStore({
  reducer: {
    customer: customerSliceReducer,
    shop: shopSliceReducer,
    misc: miscSliceReducer,
    search: searchSliceReducer,
    product: productSliceReducer,
    review: reviewSliceReducer,
    cart: cartSliceReducer,
  },
});
