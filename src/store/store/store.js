import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../../store/reducers/cartSlice"

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer
    }
})



export default store