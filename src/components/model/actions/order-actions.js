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



export const addOrder = (book_id) => {
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
                user_id: 1,  //Automatiskai orderi kuria Eimantui Taraseviciui
                status_id: 1, //Automatiskai parenka OrderStatus "new"
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