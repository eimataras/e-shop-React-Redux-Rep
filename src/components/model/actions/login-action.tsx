import jwt from 'jsonwebtoken';
import {auth} from '../../../firebase';
import {CurrentUser} from "../dataTypes/CurrentUserState";

export const REQUEST_CURRENT_USER = 'REQUEST_CURRENT_USER';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_CURRENT_USER_FAILURE = 'RECEIVE_CURRENT_USER_FAILURE';

export const requestCurrentUser = () => ({type: REQUEST_CURRENT_USER});
export const receiveCurrentUser = (user?: CurrentUser) => ({
    type: RECEIVE_CURRENT_USER,
    payload: user,
});
export const receiveCurrentUserFailure = (error) => ({
    type: RECEIVE_CURRENT_USER_FAILURE,
    payload: error,
});


export const saveCurrentUser = (currentUser?: CurrentUser) => (dispatch) => {
    dispatch(requestCurrentUser());
    if (currentUser) {
        dispatch(receiveCurrentUser(currentUser));
    } else {
        dispatch(receiveCurrentUserFailure('noCurrentUser'))
    }
};


export const signInWithEmailAndPassword = (email, password) => (dispatch) => {
    dispatch(requestCurrentUser());
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            if (auth.currentUser)
                auth.currentUser.getIdToken(true)
                    .then((idToken) => {
                        fetch('/api/auth', {
                            method: 'post',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                idToken,
                            }),
                        })
                            .then((result) => {
                                result.json()
                                    .then((json) => {
                                        localStorage.setItem('jwtToken', json.jwt);
                                        localStorage.setItem('firebaseToken', idToken);
                                        dispatch(receiveCurrentUser(jwt.decode(json.jwt)));
                                    })
                                    .catch(() => {
                                        dispatch(receiveCurrentUserFailure('loginError'));
                                    });
                            })
                            .catch(() => {
                                dispatch(receiveCurrentUserFailure('loginError'));
                            });
                    })
                    .catch(() => {
                        dispatch(receiveCurrentUserFailure('loginError'));
                    });
        })
        .catch(() => {
            dispatch(receiveCurrentUserFailure('loginError'));
        });
};

export default function setHeaders(headers) {
    if ((localStorage.jwtToken) && (localStorage.firebaseToken)) {
        return {
            ...headers,
            Authorization: `Bearer ${localStorage.jwtToken}`,
            Firebase: `Bearer ${localStorage.firebaseToken}`,
        };
    }
    return headers;
}
