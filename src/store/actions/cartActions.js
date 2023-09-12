import axios from "axios";
import { showCartContainer, onAddToCart, incrementItem, decrementItem, fetchCartData } from "../reducers/cartSlice";

export const showCart = showCartContainer;




export const fetchdataAction = () => {
    return async (dispatch, getState) => {
        try {
            const { data } = await axios.get(`https://dummy-redux-project-dfc22-default-rtdb.asia-southeast1.firebasedatabase.app/cart/.json`)

            if (data) {
                const newArray = Object.keys(data).map((firebaseId) => ({
                    firebaseId,
                    ...data[firebaseId],
                }));

                dispatch(fetchCartData(newArray))
            }

        } catch (error) {
            console.log(error);
        }
    }
}



// when user add something into the cart

export const onAddToCartAction = (newItem) => {

    return async (dispatch, getState) => {

        let alreadyPresent = false
        let firebaseId = ''
        const cartItems = getState().cart.cartItems
        const newCartItems = JSON.parse(JSON.stringify(cartItems)).map((val) => {

            if (val.id === newItem.id) {
                alreadyPresent = true
                firebaseId = val.firebaseId
                val.quantity += 1
            }
            return val
        })


        // if the data is already present 
        if (alreadyPresent && firebaseId) {

            try {
                const quantity = newCartItems.find((val) => val.firebaseId === firebaseId)
                const { data } = await axios.patch(`https://dummy-redux-project-dfc22-default-rtdb.asia-southeast1.firebasedatabase.app/cart/${firebaseId}.json`, quantity)

                dispatch(onAddToCart(newCartItems))

            } catch (error) {
                console.log(error);
            }

        }
        else {
            try {
                const { data } = await axios.post('https://dummy-redux-project-dfc22-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', newItem)

                const newObj = { firebaseId: data.name, ...newItem }

                dispatch(onAddToCart([...getState().cart.cartItems, newObj]));

            } catch (error) {
                console.log(error);
            }
        }
    };
};



// when user increment some product quantity from the cart 
export const IncItemAction = (id) => {
    return async (dispatch, getState) => {
        const cartItems = getState().cart.cartItems
        let firebaseId = ''
        const newCartItems = structuredClone(cartItems).map((val) => {
            if (val.id === id) {
                val.quantity += 1
                firebaseId = val.firebaseId
            }
            return val
        })
        if (firebaseId) {
            try {
                const quantity = newCartItems.find((val) => val.firebaseId === firebaseId)
                const { data } = await axios.patch(`https://dummy-redux-project-dfc22-default-rtdb.asia-southeast1.firebasedatabase.app/cart/${firebaseId}.json`, quantity)
                dispatch(incrementItem(newCartItems))

            } catch (error) {
                console.log(error);
            }
        }

    }
}

// when user decrement some product quantity from the cart

export const decItemAction = (id) => {
    return async (dispatch, getState) => {
        const cartItems = JSON.parse(JSON.stringify(getState().cart.cartItems));
        let firebaseId = ''
        let reduceToZero = false
        const newCartItems = cartItems.map((val) => {
            if (val.id === id) {
                val.quantity -= 1;
                firebaseId = val.firebaseId

                if (val.quantity === 0) {
                    reduceToZero = true
                    return null;
                }
            }
            return val;
        });


        if (reduceToZero && firebaseId) {
            const updatedCartItems = newCartItems.filter((item) => item !== null);
            const { data } = await axios.delete(`https://dummy-redux-project-dfc22-default-rtdb.asia-southeast1.firebasedatabase.app/cart/${firebaseId}.json`)
            dispatch(decrementItem(updatedCartItems));
        }
        else {
            if (firebaseId) {
                const quantity = newCartItems.find((val) => val.firebaseId === firebaseId)
                const { data } = await axios.patch(`https://dummy-redux-project-dfc22-default-rtdb.asia-southeast1.firebasedatabase.app/cart/${firebaseId}.json`, quantity)
                dispatch(decrementItem(newCartItems));
            }

        }


    };
};


