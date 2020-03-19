export const REQUEST_ORDER_LIST = 'REQUEST_ORDER_LIST';
export const RECEIVE_ORDER_LIST = 'RECEIVE_ORDER_LIST';
export const RECEIVE_ORDER_LIST_FAILURE = 'RECEIVE_ORDER_LIST_FAILURE';

export const requestOrderList = () => ({type: REQUEST_ORDER_LIST,});
export const receiveOrderList = (json) => ({type: RECEIVE_ORDER_LIST, payload: json});
export const receiveOrderListFailure = (error) => ({type: RECEIVE_ORDER_LIST_FAILURE, payload: error});


export const REQUEST_ADD_ORDER = 'REQUEST_ADD_ORDER';
export const RECEIVE_ADD_ORDER = 'RECEIVE_ADD_ORDER';
export const RECEIVE_ADD_ORDER_FAILURE = 'RECEIVE_ADD_ORDER_FAILURE';

export const requestAddOrder = () => ({type: REQUEST_ADD_ORDER,});
export const receiveAddOrder = (json) => ({type: RECEIVE_ADD_ORDER, payload: json});
export const receiveAddOrderFailure = (error) => ({type: RECEIVE_ADD_ORDER_FAILURE, payload: error});


export const REQUEST_UPDATE_ORDER = 'REQUEST_UPDATE_ORDER';
export const RECEIVE_UPDATE_ORDER = 'RECEIVE_UPDATE_ORDER';
export const RECEIVE_UPDATE_ORDER_FAILURE = 'RECEIVE_UPDATE_ORDER_FAILURE';

export const requestUpdateOrder = () => ({type: REQUEST_UPDATE_ORDER,});
export const receiveUpdateOrder = (json) => ({type: RECEIVE_UPDATE_ORDER, payload: json});
export const receiveUpdateOrderFailure = (error) => ({type: RECEIVE_UPDATE_ORDER_FAILURE, payload: error});


export const REQUEST_DELETE_ORDER = 'REQUEST_DELETE_ORDER';
export const RECEIVE_DELETE_ORDER = 'RECEIVE_DELETE_ORDER';
export const RECEIVE_DELETE_ORDER_FAILURE = 'RECEIVE_DELETE_ORDER_FAILURE';

export const requestDeleteOrder = () => ({type: REQUEST_DELETE_ORDER,});
export const receiveDeleteOrder = (json) => ({type: RECEIVE_DELETE_ORDER, payload: json});
export const receiveDeleteOrderFailure = (error) => ({type: RECEIVE_DELETE_ORDER_FAILURE, payload: error});


export const fetchOrder = () => {
    return (dispatch) => {
        dispatch(requestOrderList());
        fetch('http://localhost:8080/order/all', {method: 'get'})
            .then((result) => {
                result.json().then((json) => {
                    dispatch(receiveOrderList(json));
                    console.log('Response fetchOrder json:');
                    console.log(json);
                })
            })
            .catch((error) => {
                dispatch(receiveOrderListFailure(error))
            })
    }
};



export const addOrder = (loginUserId, statusNewId, book_id) => {
    console.log('Atejau iki action addOrder: ' + book_id);
    return (dispatch) => {

        dispatch(requestAddOrder());
        fetch('http://localhost:8080/order/add', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: loginUserId,
                status_id: statusNewId,
                book_id: book_id,
            })
        })

            .then((result) => {
                result.json().then((json) => {
                    console.log('Response json:');
                    console.log(json);
                    dispatch(receiveAddOrder(json))
                })
            })
            .catch((error) => {
                dispatch(receiveAddOrderFailure(error))
            })
    }
};


export const addOrderItem = (order_id, book_id) => {
    console.log('Atejau iki action addOrderItem. Book id: ' + book_id + '. Order id: '+ order_id);
    return (dispatch) => {

        dispatch(requestUpdateOrder());
        fetch('http://localhost:8080/orderItems/add', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order_id: order_id,
                book_id: book_id,
                quantity: 1
            })
        })

            .then((result) => {
                result.json().then((json) => {
                    console.log('Response json:');
                    console.log(json);
                    dispatch(receiveUpdateOrder(json))
                })
            })
            .catch((error) => {
                dispatch(receiveUpdateOrderFailure(error))
            })
    }
};


export const updateOrderItemQuantity = (order_item_id, order_id, book_id, quantity) => {
    console.log('Atejau iki action updateOrderItemQuantity. Book id: ' + book_id + '. Order id: '+ order_id);
    return (dispatch) => {

        dispatch(requestUpdateOrder());
        fetch('http://localhost:8080/orderItems/edit', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order_item_id: order_item_id,
                order_id: order_id,
                book_id: book_id,
                quantity: quantity
            })
        })

            .then((result) => {
                result.json().then((json) => {
                    console.log('Response json:');
                    console.log(json);
                    dispatch(receiveUpdateOrder(json))
                })
            })
            .catch((error) => {
                dispatch(receiveUpdateOrderFailure(error))
            })
    }
};


export const updateOrderStatus = (order_id, user_id, status_id) => {
    console.log('Atejau iki action updateOrder: ' + order_id, user_id, status_id);
    return (dispatch) => {

        dispatch(requestUpdateOrder());
        fetch('http://localhost:8080/order/edit', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order_id: order_id,
                user_id: user_id,
                status_id: status_id,
            })
        })

            .then((result) => {
                result.json().then((json) => {
                    console.log('Response json:');
                    console.log(json);
                    dispatch(receiveUpdateOrder(json))
                })
            })
            .catch((error) => {
                dispatch(receiveUpdateOrderFailure(error))
            })
    }
};


export const deleteOrder = (order_id) => {
    console.log('atejau iki action deleteOrder ' + order_id);
    return (dispatch) => {
        dispatch(requestDeleteOrder());
        fetch('http://localhost:8080/order/delete?order_id=' + order_id, {
            method: 'delete',
            body: JSON.stringify(order_id),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
            .then((result) => {
                result.json().then((json) => {
                    dispatch(receiveDeleteOrder(json.order_id));
                    console.log('Response deleteOrder json:');
                    console.log(json);
                })

            })
            .catch((error) => {
                dispatch(receiveDeleteOrderFailure(error));
            })
    }
};