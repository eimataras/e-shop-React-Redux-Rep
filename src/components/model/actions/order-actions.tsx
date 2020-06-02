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


export const fetchOrder = () => async (dispatch) => {
    dispatch(requestOrderList());
    try {
        let response = await fetch('/order/all', {
            method: 'get',
            headers: setHeaders({
                Accept: 'application/json',
            }),
        });
        if (response.status === 200) {
            let json = await response.json();
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

    // if (result.status === 200) {
    //     result.json()
    //         .then((json) => {
    //             dispatch(receiveOrderList(json));
    //         });
    // } else {
    //     dispatch(receiveOrderListFailure('error'));
    //     dispatch(receiveCurrentUserFailure('error'));
    // auth.signOut()
    //     .then(() => {
    //         localStorage.removeItem('jwtToken');
    //         localStorage.removeItem('firebaseToken');
    //     });
    // }
    // .catch((error) => {
    //     dispatch(receiveOrderListFailure(error));
    // });
};


export const addOrder = (loginUserId: number, statusNewId: number, book_id: number) => async (dispatch) => {
    dispatch(requestAddOrder());
    try {
        let response = await fetch('/order/add', {
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
        });
        if (response.status === 200) {
            let json = await response.json();
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


    // then((result) => {
    //     if (result.status === 200) {
    //         result.json()
    //             .then((json) => {
    //                 dispatch(receiveAddOrder(json));
    //             });
    //     } else {
    //         dispatch(receiveAddOrderFailure('error'));
    //         dispatch(receiveCurrentUserFailure('errorRedirectToSignIn'));
    //         auth.signOut()
    //             .then(() => {
    //                 localStorage.removeItem('jwtToken');
    //                 localStorage.removeItem('firebaseToken');
    //             });
    //     }
    // })
    //     .catch((error) => {
    //         dispatch(receiveAddOrderFailure(error));
    //     });
};


export const addOrderItem = (order_id: number, book_id: number) => async (dispatch) => {
    dispatch(requestUpdateOrder());
    try {
        let response = await fetch('/orderItems/add', {
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
        });
        if (response.status === 200) {
            let json = await response.json();
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

    // then((result) => {
    //     if (result.status === 200) {
    //         result.json()
    //             .then((json) => {
    //                 dispatch(receiveUpdateOrder(json));
    //             });
    //     } else {
    //         dispatch(receiveUpdateOrderFailure('error'));
    //         dispatch(receiveCurrentUserFailure('errorRedirectToSignIn'));
    //         auth.signOut()
    //             .then(() => {
    //                 localStorage.removeItem('jwtToken');
    //                 localStorage.removeItem('firebaseToken');
    //             });
    //     }
    // })
    //     .catch((error) => {
    //         dispatch(receiveUpdateOrderFailure(error));
    //     });
};


export const updateOrderItemQuantity = (order_item_id: number, order_id: number, book_id: number, quantity: number) => async (dispatch) => {
    dispatch(requestUpdateOrder());
    try {
        let response = await fetch('/orderItems/edit', {
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
        });
        if (response.status === 200) {
            let json = await response.json();
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

    // then((result) => {
    //     if (result.status === 200) {
    //         result.json()
    //             .then((json) => {
    //                 dispatch(receiveUpdateOrder(json));
    //             });
    //     } else {
    //         dispatch(receiveUpdateOrderFailure('error'));
    //         dispatch(receiveCurrentUserFailure('error'));
    //         auth.signOut()
    //             .then(() => {
    //                 localStorage.removeItem('jwtToken');
    //                 localStorage.removeItem('firebaseToken');
    //             });
    //     }
    // })
    //     .catch((error) => {
    //         dispatch(receiveUpdateOrderFailure(error));
    //     });
};


export const updateOrderStatus = (order_id: number, user_id: number, status_id: number) => async (dispatch) => {
    dispatch(requestUpdateOrder());
    try {
        let response = await fetch('/order/edit', {
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
        });
        if (response.status === 200) {
            let json = await response.json();
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


    // then((result) => {
    //     if (result.status === 200) {
    //         result.json()
    //             .then((json) => {
    //                 dispatch(receiveUpdateOrder(json));
    //             });
    //     } else {
    //         dispatch(receiveUpdateOrderFailure('error'));
    //         dispatch(receiveCurrentUserFailure('error'));
    //         auth.signOut()
    //             .then(() => {
    //                 localStorage.removeItem('jwtToken');
    //                 localStorage.removeItem('firebaseToken');
    //             });
    //     }
    // })
    //     .catch((error) => {
    //         dispatch(receiveUpdateOrderFailure(error));
    //     });
};


export const deleteOrder = (order_id: number) => async (dispatch) => {
    dispatch(requestDeleteOrder());
    try {
        let response = await fetch(`/order/delete?order_id=${order_id}`, {
            method: 'delete',
            body: JSON.stringify(order_id),
            headers: setHeaders({
                'Content-Type': 'application/json',
            }),
        });
        if (response.status === 200) {
            let json = await response.json();
            dispatch(receiveDeleteOrder(json.order_id));
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


    // then((result) => {
    //     if (result.status === 200) {
    //         result.json()
    //             .then((json) => {
    //                 dispatch(receiveDeleteOrder(json.order_id));
    //             });
    //     } else {
    //         dispatch(receiveDeleteOrderFailure('error'));
    //         dispatch(receiveCurrentUserFailure('error'));
    //         auth.signOut()
    //             .then(() => {
    //                 localStorage.removeItem('jwtToken');
    //                 localStorage.removeItem('firebaseToken');
    //             });
    //     }
    // })
    //     .catch((error) => {
    //         dispatch(receiveDeleteOrderFailure(error));
    //     });
};
