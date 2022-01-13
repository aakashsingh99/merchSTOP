import axios from 'axios';
import {ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_LIST_USER_RQUEST, ORDER_LIST_USER_SUCCESS, ORDER_LIST_USER_FAIL} 
from '../constants/orderConstants'

export const createNewOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({type: ORDER_CREATE_REQUEST});
        const { userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post('/api/order', order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({type: ORDER_CREATE_FAIL, 
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
        })
    }
}

export const getOrderDetails = (id) => async(dispatch, getState) => {
    try {
        dispatch({type: ORDER_DETAILS_REQUEST});

        //auth
        const { userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/order/${id}`, config);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({type: ORDER_DETAILS_FAIL, 
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
        })
    }
}

export const payOrder = (id, paymentResult) => async(dispatch, getState) => {
    try {
        dispatch({type: ORDER_PAY_REQUEST});

        //auth
        const { userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/order/${id}/pay`, paymentResult, config);

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({type: ORDER_PAY_FAIL, 
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
        })
    }
}

export const getAllUserOrders = () => async(dispatch, getState) => {
    try {
        dispatch({type: ORDER_LIST_USER_RQUEST});

        //auth
        const { userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get('/api/order/myorders', config);

        dispatch({
            type: ORDER_LIST_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({type: ORDER_LIST_USER_FAIL, 
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
        })
    }
}