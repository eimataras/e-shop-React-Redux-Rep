import setHeaders, { receiveCurrentUserFailure } from './login-action';
import { auth } from '../../../firebase';

export const REQUEST_ORDER_LIST = 'REQUEST_ORDER_LIST';
export const RECEIVE_ORDER_LIST = 'RECEIVE_ORDER_LIST';
export const RECEIVE_ORDER_LIST_FAILURE = 'RECEIVE_ORDER_LIST_FAILURE';

export const requestOrderList = () => ({ type: REQUEST_ORDER_LIST });
export const receiveOrderList = (json) => ({
    type: RECEIVE_ORDER_LIST,
    payload: json,
});
export const receiveOrderListFailure = (error) => ({
    type: RECEIVE_ORDER_LIST_FAILURE,
    payload: error,
});


export const REQUEST_ADD_ORDER = 'REQUEST_ADD_ORDER';
export const RECEIVE_ADD_ORDER = 'RECEIVE_ADD_ORDER';
export const RECEIVE_ADD_ORDER_FAILURE = 'RECEIVE_ADD_ORDER_FAILURE';

export const requestAddOrder = () => ({ type: REQUEST_ADD_ORDER });
export const receiveAddOrder = (json) => ({
    type: RECEIVE_ADD_ORDER,
    payload: json,
});
export const receiveAddOrderFailure = (error) => ({
    type: RECEIVE_ADD_ORDER_FAILURE,
    payload: error,
});


export const REQUEST_UPDATE_ORDER = 'REQUEST_UPDATE_ORDER';
export const RECEIVE_UPDATE_ORDER = 'RECEIVE_UPDATE_ORDER';
export const RECEIVE_UPDATE_ORDER_FAILURE = 'RECEIVE_UPDATE_ORDER_FAILURE';

export const requestUpdateOrder = () => ({ type: REQUEST_UPDATE_ORDER });
export const receiveUpdateOrder = (json) => ({
    type: RECEIVE_UPDATE_ORDER,
    payload: json,
});
export const receiveUpdateOrderFailure = (error) => ({
    type: RECEIVE_UPDATE_ORDER_FAILURE,
    payload: error,
});


export const REQUEST_DELETE_ORDER = 'REQUEST_DELETE_ORDER';
export const RECEIVE_DELETE_ORDER = 'RECEIVE_DELETE_ORDER';
export const RECEIVE_DELETE_ORDER_FAILURE = 'RECEIVE_DELETE_ORDER_FAILURE';

export const requestDeleteOrder = () => ({ type: REQUEST_DELETE_ORDER });
export const receiveDeleteOrder = (json) => ({
    type: RECEIVE_DELETE_ORDER,
    payload: json,
});
export const receiveDeleteOrderFailure = (error) => ({
    type: RECEIVE_DELETE_ORDER_FAILURE,
    payload: error,
});


export const fetchOrder = () => async (dispatch) => {
    dispatch(requestOrderList());
    try {
        const response = await fetch('/order/all', {
            method: 'get',
            headers: setHeaders({
                Accept: 'application/json',
            }),
        });
        if (response.status === 200) {
            const json = await response.json();
            dispatch(receiveOrderList(json));
        } else if (response.status === 403) {
            dispatch(receiveOrderListFailure('error'));
            dispatch(receiveCurrentUserFailure('error'));
            auth.signOut()
                .then(() => {
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('firebaseToken');
                });
        } else {
            dispatch(receiveOrderListFailure('error'));
        }
    } catch (error) {
        dispatch(receiveOrderListFailure(error));
    }
};


export const addOrder = (loginUserId: number, statusNewId: number, bookId: number) => async (dispatch) => {
    dispatch(requestAddOrder());
    try {
        const response = await fetch('/order/add', {
            method: 'post',
            headers: setHeaders({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                userId: loginUserId,
                statusId: statusNewId,
                bookId,
            }),
        });
        if (response.status === 200) {
            const json = await response.json();
            dispatch(receiveAddOrder(json));
        } else if (response.status === 403) {
            dispatch(receiveAddOrderFailure('error'));
            dispatch(receiveCurrentUserFailure('errorRedirectToSignIn'));
            auth.signOut()
                .then(() => {
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('firebaseToken');
                });
        } else {
            dispatch(receiveAddOrderFailure('error'));
        }
    } catch (error) {
        dispatch(receiveAddOrderFailure(error));
    }
};


export const addOrderItem = (orderId: number, bookId: number) => async (dispatch) => {
    dispatch(requestUpdateOrder());
    try {
        const response = await fetch('/orderItems/add', {
            method: 'post',
            headers: setHeaders({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                orderId,
                bookId,
                quantity: 1,
            }),
        });
        if (response.status === 200) {
            const json = await response.json();
            dispatch(receiveUpdateOrder(json));
        } else if (response.status === 403) {
            dispatch(receiveUpdateOrderFailure('error'));
            dispatch(receiveCurrentUserFailure('errorRedirectToSignIn'));
            auth.signOut()
                .then(() => {
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('firebaseToken');
                });
        } else {
            dispatch(receiveUpdateOrderFailure('error'));
        }
    } catch (error) {
        dispatch(receiveUpdateOrderFailure(error));
    }
};


export const updateOrderItemQuantity = (orderItemId: number, orderId: number, bookId: number, quantity: number) => async (dispatch) => {
    dispatch(requestUpdateOrder());
    try {
        const response = await fetch('/orderItems/edit', {
            method: 'put',
            headers: setHeaders({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                orderItemId,
                orderId,
                bookId,
                quantity,
            }),
        });
        if (response.status === 200) {
            const json = await response.json();
            dispatch(receiveUpdateOrder(json));
        } else if (response.status === 403) {
            dispatch(receiveUpdateOrderFailure('error'));
            dispatch(receiveCurrentUserFailure('error'));
            auth.signOut()
                .then(() => {
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('firebaseToken');
                });
        } else {
            dispatch(receiveUpdateOrderFailure('error'));
        }
    } catch (error) {
        dispatch(receiveUpdateOrderFailure(error));
    }
};


export const updateOrderStatus = (orderId: number, userId: number, statusId: number) => async (dispatch) => {
    dispatch(requestUpdateOrder());
    try {
        const response = await fetch('/order/edit', {
            method: 'put',
            headers: setHeaders({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                orderId,
                userId,
                statusId,
            }),
        });
        if (response.status === 200) {
            const json = await response.json();
            dispatch(receiveUpdateOrder(json));
        } else if (response.status === 403) {
            dispatch(receiveUpdateOrderFailure('error'));
            dispatch(receiveCurrentUserFailure('error'));
            auth.signOut()
                .then(() => {
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('firebaseToken');
                });
        } else {
            dispatch(receiveUpdateOrderFailure('error'));
        }
    } catch (error) {
        dispatch(receiveUpdateOrderFailure(error));
    }
};


export const deleteOrder = (orderId: number) => async (dispatch) => {
    dispatch(requestDeleteOrder());
    try {
        const response = await fetch(`/order/delete?orderId=${orderId}`, {
            method: 'delete',
            body: JSON.stringify({
                orderId,
            }),
            headers: setHeaders({
                'Content-Type': 'application/json',
            }),
        });
        if (response.status === 200) {
            const json = await response.json();
            dispatch(receiveDeleteOrder(json.orderId));
        } else if (response.status === 403) {
            dispatch(receiveDeleteOrderFailure('error'));
            dispatch(receiveCurrentUserFailure('error'));
            auth.signOut()
                .then(() => {
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('firebaseToken');
                });
        } else {
            dispatch(receiveDeleteOrderFailure('error'));
        }
    } catch (error) {
        dispatch(receiveDeleteOrderFailure(error));
    }
};
