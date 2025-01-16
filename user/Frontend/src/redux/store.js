import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice"
import productSlice from "./productSlice";
import authSlice from "./authSlice";

export default configureStore(
    {
        reducer: {
            "cart": cartSlice,
            "product": productSlice,
            "auth": authSlice
    }
})