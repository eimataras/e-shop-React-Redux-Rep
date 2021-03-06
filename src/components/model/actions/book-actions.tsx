import setHeaders, { receiveCurrentUserFailure } from './login-action';
import { auth } from '../../../firebase';
import { IBook } from '../../app/books/addBook';

export const REQUEST_BOOK_LIST = 'REQUEST_BOOK_LIST';
export const RECEIVE_BOOK_LIST = 'RECEIVE_BOOK_LIST';
export const RECEIVE_BOOK_LIST_FAILURE = 'RECEIVE_BOOK_LIST_FAILURE';

export const requestBookList = () => ({ type: REQUEST_BOOK_LIST });
export const receiveBookList = (json) => ({
    type: RECEIVE_BOOK_LIST,
    payload: json,
});
export const receiveBookListFailure = (error) => ({
    type: RECEIVE_BOOK_LIST_FAILURE,
    payload: error,
});


export const REQUEST_ADD_BOOK = 'REQUEST_ADD_BOOK';
export const RECEIVE_ADD_BOOK = 'RECEIVE_ADD_BOOK';
export const RECEIVE_ADD_BOOK_FAILURE = 'RECEIVE_ADD_BOOK_FAILURE';

export const requestAddBook = () => ({ type: REQUEST_ADD_BOOK });
export const receiveAddBook = (json) => ({
    type: RECEIVE_ADD_BOOK,
    payload: json,
});
export const receiveAddBookFailure = (error) => ({
    type: RECEIVE_ADD_BOOK_FAILURE,
    payload: error,
});


export const REQUEST_DELETE_BOOK = 'REQUEST_DELETE_BOOK';
export const RECEIVE_DELETE_BOOK = 'RECEIVE_DELETE_BOOK';
export const RECEIVE_DELETE_BOOK_FAILURE = 'RECEIVE_DELETE_BOOK_FAILURE';

export const requestDeleteBook = () => ({ type: REQUEST_DELETE_BOOK });
export const receiveDeleteBook = (json) => ({
    type: RECEIVE_DELETE_BOOK,
    payload: json,
});
export const receiveDeleteBookFailure = (error) => ({
    type: RECEIVE_DELETE_BOOK_FAILURE,
    payload: error,
});


export const fetchBook = () => async (dispatch) => {
    dispatch(requestBookList());
    try {
        const response = await fetch('/book/all', {
            method: 'get',
            headers: setHeaders({
                Accept: 'application/json',
            }),
        });
        if (response.status === 200) {
            const json = await response.json();
            dispatch(receiveBookList(json));
        } else {
            dispatch(receiveBookListFailure('Server error'));
        }
    } catch (error) {
        dispatch(receiveBookListFailure('Server error'));
    }
};


export const addBook = (book: IBook) => async (dispatch) => {
    dispatch(requestAddBook());
    try {
        const response = await fetch('/book/add', {
            method: 'post',
            headers: setHeaders({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                title: book.title,
                author: book.author,
                publishedDate: book.publishedDate,
                bookCover: book.bookCover,
                quantity: book.quantity,
            }),
        });
        if (response.status === 200) {
            const json = await response.json();
            dispatch(receiveAddBook(json));
        } else if (response.status === 400 || response.status === 500) {
            dispatch(receiveAddBookFailure('Bad Request'));
        } else if (response.status === 403) {
            dispatch(receiveAddBookFailure('error'));
            dispatch(receiveCurrentUserFailure('error'));
            auth.signOut()
                .then(() => {
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('firebaseToken');
                });
        } else {
            dispatch(receiveAddBookFailure('error'));
        }
    } catch (error) {
        dispatch(receiveAddBookFailure(error));
    }
};


export const deleteBook = (id: number) => async (dispatch) => {
    dispatch(requestDeleteBook());
    try {
        const response = await fetch(`/book/delete?bookId=${id}`, {
            method: 'delete',
            body: JSON.stringify(id),
            headers: setHeaders({
                'Content-Type': 'application/json',
            }),
        });
        if (response.status === 200) {
            const json = await response.json();
            dispatch(receiveDeleteBook(json.bookId));
        } else if (response.status === 403) {
            dispatch(receiveDeleteBookFailure('error'));
            dispatch(receiveCurrentUserFailure('errorRedirectToSignIn'));
            auth.signOut()
                .then(() => {
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('firebaseToken');
                });
        } else {
            dispatch(receiveDeleteBookFailure('error'));
        }
    } catch (error) {
        dispatch(receiveDeleteBookFailure(error));
    }
};
