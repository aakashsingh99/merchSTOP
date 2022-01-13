import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productListReducer, productDetailsReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userListReducer, userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderListUserReducer, orderPayReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdateProfile: userUpdateReducer,
    userList: userListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay:   orderPayReducer,
    ordersUser: orderListUserReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
                                    ? JSON.parse(localStorage.getItem('cartItems'))
                                    : []

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
                                    ? JSON.parse(localStorage.getItem('userInfo'))
                                    : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
                                    ? JSON.parse(localStorage.getItem('shippingAddress'))
                                    : null


const initialState = {
    cart: { cartItems: cartItemsFromLocalStorage, shippingAddress: shippingAddressFromStorage},
    userLogin: { userInfo: userInfoFromLocalStorage},
}

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      state = initialState
    }
    return reducer(state, action)
}  

const middleware = [thunk]
const store = createStore(rootReducer, 
                            initialState, 
                            composeWithDevTools(applyMiddleware(...middleware))
                        );

export default store;
