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
    dispatch(receiveCurrentUser(currentUser));
};


export const logInWithEmailAndPassword = (email: string, password: string) => async (dispatch) => {
    try {
        dispatch(requestCurrentUser());
        await auth.signInWithEmailAndPassword(email, password);
        if (auth.currentUser) {
            let idToken = await auth.currentUser.getIdToken(true);
            let result = await fetch('/api/auth', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idToken,
                }),
            });
            let json = await result.json();
            localStorage.setItem('jwtToken', json.jwt);
            localStorage.setItem('firebaseToken', idToken);
            const decodedJWT: CurrentUser | undefined = jwt.decode(json.jwt);
            dispatch(receiveCurrentUser(decodedJWT));
        }
    } catch (error) {
        dispatch(receiveCurrentUserFailure('loginError'));
    }
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
