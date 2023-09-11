import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name: 'cart',
    initialState: { showCart: false },
    reducers: {
        showCartContainer(state) {
            state.showCart = !state.showCart
        },

    }
})


export const { showCartContainer, hideCartContainer } = cartSlice.actions;
export default cartSlice;