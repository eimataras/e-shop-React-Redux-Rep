import setHeaders from "./login-action";

export const REQUEST_BOOK_LIST = 'REQUEST_BOOK_LIST';
export const RECEIVE_BOOK_LIST = 'RECEIVE_BOOK_LIST';
export const RECEIVE_BOOK_LIST_FAILURE = 'RECEIVE_BOOK_LIST_FAILURE';

export const requestBookList = () => ({type: REQUEST_BOOK_LIST,});
export const receiveBookList = (json) => ({type: RECEIVE_BOOK_LIST, payload: json});
export const receiveBookListFailure = (error) => ({type: RECEIVE_BOOK_LIST_FAILURE, payload: error});


export const REQUEST_ADD_BOOK = 'REQUEST_ADD_BOOK';
export const RECEIVE_ADD_BOOK = 'RECEIVE_ADD_BOOK';
export const RECEIVE_ADD_BOOK_FAILURE = 'RECEIVE_ADD_BOOK_FAILURE';

export const requestAddBook = () => ({type: REQUEST_ADD_BOOK,});
export const receiveAddBook = (json) => ({type: RECEIVE_ADD_BOOK, payload: json});
export const receiveAddBookFailure = (error) => ({type: RECEIVE_ADD_BOOK_FAILURE, payload: error});


export const REQUEST_DELETE_BOOK = 'REQUEST_DELETE_BOOK';
export const RECEIVE_DELETE_BOOK = 'RECEIVE_DELETE_BOOK';
export const RECEIVE_DELETE_BOOK_FAILURE = 'RECEIVE_DELETE_BOOK_FAILURE';

export const requestDeleteBook = () => ({type: REQUEST_DELETE_BOOK,});
export const receiveDeleteBook = (json) => ({type: RECEIVE_DELETE_BOOK, payload: json});
export const receiveDeleteBookFailure = (error) => ({type: RECEIVE_DELETE_BOOK_FAILURE, payload: error});


export const fetchBook = () => {
    return (dispatch) => {
        dispatch(requestBookList());
        fetch('/book/all', {
            method: 'get',
            headers: setHeaders({
                'Accept': 'application/json',
            })
        })
            .then((result) => {
                result.json().then((json) => {
                    dispatch(receiveBookList(json))
                })
            })
            .catch((error) => {
                dispatch(receiveBookListFailure(error))
            })
    }
};


export const addBook = (knyga) => {
    console.log('Atejau iki action add: ' + knyga.title);
    return (dispatch) => {

        dispatch(requestAddBook());
        fetch('/book/add', {
            method: 'post',
            headers: setHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                title: knyga.title,
                author: knyga.author,
                published_date: knyga.published_date,
                book_cover: knyga.book_cover,
                quantity: knyga.quantity
            })
        })

            .then((result) => {
                result.json().then((json) => {
                    console.log('Response json:')
                    console.log(json)
                    dispatch(receiveAddBook(json))
                })
            })
            .catch((error) => {
                dispatch(receiveAddBookFailure(error))
            })
    }
};

export const deleteBook = (id) => {
    console.log('atejau iki action delete ' + id);
    return (dispatch) => {
        dispatch(requestDeleteBook());
        fetch('/book/delete?book_id=' + id, {
            method: 'delete',
            body: JSON.stringify(id),
            headers: setHeaders({
                'Content-Type': 'application/json',
            }),
        })
            .then((result) => {
                result.json().then((json) => {
                    dispatch(receiveDeleteBook(json.book_id));
                })
            })
            .catch((error) => {
                dispatch(receiveDeleteBookFailure(error));
            })
    }
};