import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import  cartSliceReducer from "./slices/cartSlice";
import authSliceReducer from "./slices/authSlice";
//----------------------------------------------------------------
const store = configureStore({
  reducer: { 
    [apiSlice.reducerPath]: apiSlice.reducer ,
    cart: cartSliceReducer,
    auth: authSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),//We're going to return this get default middleware and then concat the API API slice middleware onto that
  devTools: true,
});
export default store;
//slices=>a concept in Redux toolkit=>and it's a way to organize your state.
