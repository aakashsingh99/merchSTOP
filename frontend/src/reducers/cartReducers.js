import {
    CART_ADD_ITEM, CART_REMOVE_ITEM, CART_RESET, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'
  
export const cartReducer = ( state = { cartItems: [], shippingAddress:{}, paymentMethod:''}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            //If Item exists
            const existItem = state.cartItems.find((x) => x.product === item.product)
            if (existItem) {
                return  {...state,
                            cartItems: state.cartItems.map((x) =>
                                x.product === existItem.product ? item : x
                            ),
                }
            } else {
                return {
                    ...state,
                    //Add the item to cart Item if doesn't exist
                    cartItems: [...state.cartItems, item],
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(t=> t.product !== action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        case CART_RESET:
            return {
                cartItems: [], 
                shippingAddress:{}, 
                paymentMethod:''
            }
        default: return state;
    }
}