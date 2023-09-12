import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: { showCart: false, cartItems: [] },
    reducers: {
        showCartContainer(state) {
            state.showCart = !state.showCart;
        },
        onAddToCart(state, action) {
            state.cartItems = action.payload;
        },
        incrementItem(state, action) {
            state.cartItems = action.payload;
        },
        decrementItem(state, action) {
            state.cartItems = action.payload;
        },
        fetchCartData(state, action) {
            state.cartItems = action.payload
        }
    },
});



export const {
    showCartContainer,
    hideCartContainer,
    onAddToCart,
    incrementItem,
    decrementItem,
    fetchCartData
} = cartSlice.actions;
export default cartSlice;
