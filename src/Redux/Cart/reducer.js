import {ADD_TO_CART , REMOVE_TO_CART , INCREASE_QUANTITY , DECREASE_QUANTITY, CLEAR_CART} from "./action"


const reducer = (state, action) => {
    switch (action.type) {
    case ADD_TO_CART:
    return {
        cart: action.data
    };
    case REMOVE_TO_CART:
    return {
        cart: state.cart.map(prod => prod.id !== action.data.id)
    };
    case INCREASE_QUANTITY:
    return {
        cart: state.cart.map(prod => {
            if(prod.id === action.data.id){
                prod.quantity+= 1
            }
            return prod
        })
    };
    case DECREASE_QUANTITY:
    return {
        cart: state.cart.map(prod => {
            if(prod.id === action.data.id){
                prod.quantity-= 1
            }
            return prod
        })
    };
    case CLEAR_CART:
    return {
        cart: state.cart.map(prod => {
            prod.quantity = 0
            return prod
        })
    };
      default:
        return state;
    }
};

export default reducer