import setHeaders, { receiveCurrentUserFailure } from './login-action';
import { auth } from '../../../firebase';

export const REQUEST_USER_LIST = 'REQUEST_USER_LIST';
export const RECEIVE_USER_LIST = 'RECEIVE_USER_LIST';
export const RECEIVE_USER_LIST_FAILURE = 'RECEIVE_USER_LIST_FAILURE';

export const requestUserList = () => ({ type: REQUEST_USER_LIST });
export const receiveUserList = (json) => ({
    type: RECEIVE_USER_LIST,
    payload: json,
});
export const receiveUserListFailure = (error) => ({
    type: RECEIVE_USER_LIST_FAILURE,
    payload: error,
});


export const REQUEST_ADD_USER = 'REQUEST_ADD_USER';
export const RECEIVE_ADD_USER = 'RECEIVE_ADD_USER';
export const RECEIVE_ADD_USER_FAILURE = 'RECEIVE_ADD_USER_FAILURE';

export const requestAddUser = () => ({ type: REQUEST_ADD_USER });
export const receiveAddUser = (json) => ({
    type: RECEIVE_ADD_USER,
    payload: json,
});
export const receiveAddUserFailure = (error) => ({
    type: RECEIVE_ADD_USER_FAILURE,
    payload: error,
});


export const REQUEST_DELETE_USER = 'REQUEST_DELETE_USER';
export const RECEIVE_DELETE_USER = 'RECEIVE_DELETE_USER';
export const RECEIVE_DELETE_USER_FAILURE = 'RECEIVE_DELETE_USER_FAILURE';

export const requestDeleteUser = () => ({ type: REQUEST_DELETE_USER });
export const receiveDeleteUser = (json) => ({
    type: RECEIVE_DELETE_USER,
    payload: json,
});
export const receiveDeleteUserFailure = (error) => ({
    type: RECEIVE_DELETE_USER_FAILURE,
    payload: error,
});


export const fetchUser = () => async (dispatch) => {
    dispatch(requestUserList());
    try {
        const response = await fetch('/user/all', {
            method: 'get',
            headers: setHeaders({
                Accept: 'application/json',
            }),
        });
        if (response.status === 200) {
            const json = await response.json();
            dispatch(receiveUserList(json));
        } else if (response.status === 403) {
            dispatch(receiveUserListFailure('error'));
            dispatch(receiveCurrentUserFailure('error'));
            auth.signOut()
                .then(() => {
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('firebaseToken');
                });
        } else {
            dispatch(receiveUserListFailure('error'));
        }
    } catch (error) {
        dispatch(receiveUserListFailure(error));
    }
};


export const addClient = (user, uid: string | undefined) => async (dispatch) => {
    if (!uid) {
        dispatch(receiveAddUserFailure('error'));
    } else {
        dispatch(requestAddUser());
        try {
            const response = await fetch('/user/add-client', {
                method: 'post',
                headers: setHeaders({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    name: user.name,
                    surname: user.surname,
                    username: user.username,
                    password: user.password,
                    uid,
                }),
            });
            if (response.status === 200) {
                const json = await response.json();
                dispatch(receiveAddUser(json));
            } else {
                dispatch(receiveAddUserFailure('error'));
            }
        } catch (error) {
            dispatch(receiveAddUserFailure(error));
        }
    }
};


export const addAdmin = (user, uid: string | undefined) => async (dispatch) => {
    if (!uid) {
        dispatch(receiveAddUserFailure('error'));
    } else {
        dispatch(requestAddUser());
        try {
            const response = await fetch('/user/add-admin', {
                method: 'post',
                headers: setHeaders({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    name: user.name,
                    surname: user.surname,
                    username: user.username,
                    password: user.password,
                    uid,
                }),
            });
            if (response.status === 200) {
                const json = await response.json();
                dispatch(receiveAddUser(json));
            } else if (response.status === 403) {
                dispatch(receiveAddUserFailure('error'));
                dispatch(receiveCurrentUserFailure('error'));
                auth.signOut()
                    .then(() => {
                        localStorage.removeItem('jwtToken');
                        localStorage.removeItem('firebaseToken');
                    });
            } else {
                dispatch(receiveAddUserFailure('error'));
            }
        } catch (error) {
            dispatch(receiveAddUserFailure(error));
        }
    }
};


export const deleteUser = (id: number) => async (dispatch) => {
    dispatch(requestDeleteUser());
    try {
        const response = await fetch(`/user/delete?userId=${id}`, {
            method: 'delete',
            body: JSON.stringify(id),
            headers: setHeaders({
                'Content-Type': 'application/json',
            }),
        });
        if (response.status === 200) {
            const json = await response.json();
            dispatch(receiveDeleteUser(json.userId));
        } else if (response.status === 403) {
            dispatch(receiveDeleteUserFailure('error'));
            dispatch(receiveCurrentUserFailure('error'));
            auth.signOut()
                .then(() => {
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('firebaseToken');
                });
        } else {
            dispatch(receiveCurrentUserFailure('error'));
        }
    } catch (error) {
        dispatch(receiveDeleteUserFailure(error));
    }
};
