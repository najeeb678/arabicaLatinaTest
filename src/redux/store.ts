import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import productsSlice from "./slices/productSlice";
import orderSlice from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    order: orderSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
