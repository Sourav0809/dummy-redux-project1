import { showCartContainer, onAddToCart, incrementItem, decrementItem } from "../reducers/cartSlice";

export const showCart = showCartContainer;



export const onAddToCartAction = (newItem) => {

    return (dispatch, getState) => {
        let alreadyPresent = false
        const cartItems = getState().cart.cartItems
        const newCartItems = JSON.parse(JSON.stringify(cartItems)).map((val) => {

            if (val.id === newItem.id) {
                alreadyPresent = true
                val.quantity += 1
            }
            return val
        })
        if (alreadyPresent) {
            dispatch(onAddToCart(newCartItems))
        }
        else {

            dispatch(onAddToCart([...getState().cart.cartItems, newItem]));
        }
    };
};


export const IncItemAction = (id) => {
    return (dispatch, getState) => {
        const cartItems = getState().cart.cartItems
        const newCartItems = JSON.parse(JSON.stringify(cartItems)).map((val) => {
            if (val.id === id) {
                val.quantity += 1
            }
            return val
        })

        dispatch(incrementItem(newCartItems))

    }
}

export const decItemAction = (id) => {
    return (dispatch, getState) => {
        const cartItems = JSON.parse(JSON.stringify(getState().cart.cartItems));

        let reduceToZero = false
        const newCartItems = cartItems.map((val) => {
            if (val.id === id) {
                val.quantity -= 1;


                if (val.quantity === 0) {
                    reduceToZero = true
                    return null;
                }
            }
            return val;
        });


        if (reduceToZero) {
            const updatedCartItems = newCartItems.filter((item) => item !== null);
            dispatch(decrementItem(updatedCartItems));
        }
        else {
            dispatch(decrementItem(newCartItems));

        }


    };
};


