export const ADD_TO_CART = "ADD_TO_CART"
export const REMOVE_TO_CART = "REMOVE_TO_CART"

export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";

export const CLEAR_CART = "CLEAR_CART";


export const addToCart = (data) => {
    return {
        type: ADD_TO_CART,
        data
    }
};
export const removeToCart = (data) => {
    return {
        type: REMOVE_TO_CART,
        data
    }
}

export const increment = (data) => {
    return {
        type: INCREASE_QUANTITY,
        data
    }
}

export const decrement = (data) => {
    return {
        type: DECREASE_QUANTITY,
        data
    }
}

export const checkout = () => {
    return {
        type: CLEAR_CART,
    }
}

