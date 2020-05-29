import setHeaders, {receiveCurrentUserFailure} from './login-action';
import {auth} from '../../../firebase';

export const REQUEST_ORDER_LIST = 'REQUEST_ORDER_LIST';
export const RECEIVE_ORDER_LIST = 'RECEIVE_ORDER_LIST';
export const RECEIVE_ORDER_LIST_FAILURE = 'RECEIVE_ORDER_LIST_FAILURE';

export const requestOrderList = () => ({type: REQUEST_ORDER_LIST});
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

export const requestAddOrder = () => ({type: REQUEST_ADD_ORDER});
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

export const requestUpdateOrder = () => ({type: REQUEST_UPDATE_ORDER});
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

export const requestDeleteOrder = () => ({type: REQUEST_DELETE_ORDER});
export const receiveDeleteOrder = (json) => ({
    type: RECEIVE_DELETE_ORDER,
    payload: json,
});
export const receiveDeleteOrderFailure = (error) => ({
    type: RECEIVE_DELETE_ORDER_FAILURE,
    payload: error,
});


export const fetchOrder = () => (dispatch) => {
    dispatch(requestOrderList());
    fetch('/order/all', {
        method: 'get',
        headers: setHeaders({
            Accept: 'application/json',
        }),
    })
        .then((result) => {
            if (result.status === 200) {
                result.json()
                    .then((json) => {
                        dispatch(receiveOrderList(json));
                    });
            } else {
                dispatch(receiveOrderListFailure('error'));
                dispatch(receiveCurrentUserFailure('error'));
                auth.signOut()
                    .then(() => {
                        localStorage.removeItem('jwtToken');
                        localStorage.removeItem('firebaseToken');
                    });
            }
        })
        .catch((error) => {
            dispatch(receiveOrderListFailure(error));
        });
};


export const addOrder = (loginUserId: number, statusNewId: number, book_id: number, history: any) => (dispatch) => {
    dispatch(requestAddOrder());
    fetch('/order/add', {
        method: 'post',
        headers: setHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            user_id: loginUserId,
            status_id: statusNewId,
            book_id,
        }),
    })
        .then((result) => {
            if (result.status === 200) {
                result.json()
                    .then((json) => {
                        dispatch(receiveAddOrder(json));
                    });
            } else {
                dispatch(receiveAddOrderFailure('error'));
                dispatch(receiveCurrentUserFailure('error'));
                auth.signOut()
                    .then(() => {
                        localStorage.removeItem('jwtToken');
                        localStorage.removeItem('firebaseToken');
                    });
                history.push('/signin');
            }
        })
        .catch((error) => {
            dispatch(receiveAddOrderFailure(error));
        });
};


export const addOrderItem = (order_id: number, book_id: number, history: any) => (dispatch) => {
    dispatch(requestUpdateOrder());
    fetch('/orderItems/add', {
        method: 'post',
        headers: setHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            order_id,
            book_id,
            quantity: 1,
        }),
    })
        .then((result) => {
            if (result.status === 200) {
                result.json()
                    .then((json) => {
                        dispatch(receiveUpdateOrder(json));
                    });
            } else {
                dispatch(receiveUpdateOrderFailure('error'));
                dispatch(receiveCurrentUserFailure('error'));
                auth.signOut()
                    .then(() => {
                        localStorage.removeItem('jwtToken');
                        localStorage.removeItem('firebaseToken');
                    });
                history.push('/signin');
            }
        })
        .catch((error) => {
            dispatch(receiveUpdateOrderFailure(error));
        });
};


export const updateOrderItemQuantity = (order_item_id: number, order_id: number, book_id: number, quantity: number) => (dispatch) => {
    dispatch(requestUpdateOrder());
    fetch('/orderItems/edit', {
        method: 'put',
        headers: setHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            order_item_id,
            order_id,
            book_id,
            quantity,
        }),
    })
        .then((result) => {
            if (result.status === 200) {
                result.json()
                    .then((json) => {
                        dispatch(receiveUpdateOrder(json));
                    });
            } else {
                dispatch(receiveUpdateOrderFailure('error'));
                dispatch(receiveCurrentUserFailure('error'));
                auth.signOut()
                    .then(() => {
                        localStorage.removeItem('jwtToken');
                        localStorage.removeItem('firebaseToken');
                    });
            }
        })
        .catch((error) => {
            dispatch(receiveUpdateOrderFailure(error));
        });
};


export const updateOrderStatus = (order_id: number, user_id: number, status_id: number) => (dispatch) => {
    dispatch(requestUpdateOrder());
    fetch('/order/edit', {
        method: 'put',
        headers: setHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            order_id,
            user_id,
            status_id,
        }),
    })
        .then((result) => {
            if (result.status === 200) {
                result.json()
                    .then((json) => {
                        dispatch(receiveUpdateOrder(json));
                    });
            } else {
                dispatch(receiveUpdateOrderFailure('error'));
                dispatch(receiveCurrentUserFailure('error'));
                auth.signOut()
                    .then(() => {
                        localStorage.removeItem('jwtToken');
                        localStorage.removeItem('firebaseToken');
                    });
            }
        })
        .catch((error) => {
            dispatch(receiveUpdateOrderFailure(error));
        });
};


export const deleteOrder = (order_id: number) => (dispatch) => {
    dispatch(requestDeleteOrder());
    fetch(`/order/delete?order_id=${order_id}`, {
        method: 'delete',
        body: JSON.stringify(order_id),
        headers: setHeaders({
            'Content-Type': 'application/json',
        }),
    })
        .then((result) => {
            if (result.status === 200) {
                result.json()
                    .then((json) => {
                        dispatch(receiveDeleteOrder(json.order_id));
                    });
            } else {
                dispatch(receiveDeleteOrderFailure('error'));
                dispatch(receiveCurrentUserFailure('error'));
                auth.signOut()
                    .then(() => {
                        localStorage.removeItem('jwtToken');
                        localStorage.removeItem('firebaseToken');
                    });
            }
        })
        .catch((error) => {
            dispatch(receiveDeleteOrderFailure(error));
        });
};
