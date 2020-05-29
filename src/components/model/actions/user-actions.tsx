import setHeaders, {receiveCurrentUserFailure} from './login-action';
import {auth} from '../../../firebase';

export const REQUEST_USER_LIST = 'REQUEST_USER_LIST';
export const RECEIVE_USER_LIST = 'RECEIVE_USER_LIST';
export const RECEIVE_USER_LIST_FAILURE = 'RECEIVE_USER_LIST_FAILURE';

export const requestUserList = () => ({type: REQUEST_USER_LIST});
export const receiveUserList = (json) => ({
    type: RECEIVE_USER_LIST,
    payload: json
});
export const receiveUserListFailure = (error) => ({
    type: RECEIVE_USER_LIST_FAILURE,
    payload: error
});


export const REQUEST_ADD_USER = 'REQUEST_ADD_USER';
export const RECEIVE_ADD_USER = 'RECEIVE_ADD_USER';
export const RECEIVE_ADD_USER_FAILURE = 'RECEIVE_ADD_USER_FAILURE';

export const requestAddUser = () => ({type: REQUEST_ADD_USER});
export const receiveAddUser = (json) => ({
    type: RECEIVE_ADD_USER,
    payload: json
});
export const receiveAddUserFailure = (error) => ({
    type: RECEIVE_ADD_USER_FAILURE,
    payload: error
});


export const REQUEST_DELETE_USER = 'REQUEST_DELETE_USER';
export const RECEIVE_DELETE_USER = 'RECEIVE_DELETE_USER';
export const RECEIVE_DELETE_USER_FAILURE = 'RECEIVE_DELETE_USER_FAILURE';

export const requestDeleteUser = () => ({type: REQUEST_DELETE_USER});
export const receiveDeleteUser = (json) => ({
    type: RECEIVE_DELETE_USER,
    payload: json
});
export const receiveDeleteUserFailure = (error) => ({
    type: RECEIVE_DELETE_USER_FAILURE,
    payload: error
});


export const fetchUser = () => (dispatch) => {
    dispatch(requestUserList());
    fetch('/user/all', {
        method: 'get',
        headers: setHeaders({
            Accept: 'application/json',
        }),
    })
        .then((result) => {
            if (result.status === 200) {
                result.json()
                    .then((json) => {
                        dispatch(receiveUserList(json));
                    });
            } else {
                dispatch(receiveUserListFailure('error'));
                dispatch(receiveCurrentUserFailure('error'));
                auth.signOut()
                    .then(() => {
                        localStorage.removeItem('jwtToken');
                        localStorage.removeItem('firebaseToken');
                    });
            }
        })
        .catch((error) => {
            dispatch(receiveUserListFailure(error));
        });
};


export const addClient = (user, uid: string | undefined) => (dispatch) => {
    if (!uid) {
        dispatch(receiveAddUserFailure('error'));
    } else {
        dispatch(requestAddUser());
        fetch('/user/add-client', {
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
        })
            .then((result) => {
                if (result.status === 200) {
                    result.json()
                        .then((json) => {
                            dispatch(receiveAddUser(json));
                        });
                } else {
                    dispatch(receiveAddUserFailure('error'));
                }
            })
            .catch((error) => {
                dispatch(receiveAddUserFailure(error));
            });
    }
};


export const addAdmin = (user, uid: string | undefined) => (dispatch) => {
    if (!uid) {
        dispatch(receiveAddUserFailure('error'));
    } else {
        dispatch(requestAddUser());
        fetch('/user/add-admin', {
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
        })
            .then((result) => {
                if (result.status === 200) {
                    result.json()
                        .then((json) => {
                            dispatch(receiveAddUser(json));
                        });
                } else {
                    dispatch(receiveAddUserFailure('error'));
                }
            })
            .catch((error) => {
                dispatch(receiveAddUserFailure(error));
            });
    }
};


export const deleteUser = (id: number) => (dispatch) => {
    dispatch(requestDeleteUser());
    fetch(`/user/delete?user_id=${id}`, {
        method: 'delete',
        body: JSON.stringify(id),
        headers: setHeaders({
            'Content-Type': 'application/json',
        }),
    })
        .then((result) => {
            if (result.status === 200) {
                result.json()
                    .then((json) => {
                        dispatch(receiveDeleteUser(json.user_id));
                    })
            } else {
                dispatch(receiveDeleteUserFailure('error'));
                dispatch(receiveCurrentUserFailure('error'));
                auth.signOut()
                    .then(() => {
                        localStorage.removeItem('jwtToken');
                        localStorage.removeItem('firebaseToken');
                    });
            }
        })
        .catch((error) => {
            dispatch(receiveDeleteUserFailure(error));
        });
};
