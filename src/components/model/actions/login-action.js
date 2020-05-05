import jwt from 'jsonwebtoken';
import {auth} from "../../../firebase"

export const REQUEST_CURRENT_USER = 'REQUEST_CURRENT_USER';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_CURRENT_USER_FAILURE = 'RECEIVE_CURRENT_USER_FAILURE';

export const requestCurrentUser = () => ({type: REQUEST_CURRENT_USER,});
export const receiveCurrentUser = (user) => ({type: RECEIVE_CURRENT_USER, payload: user});
export const receiveCurrentUserFailure = (error) => ({type: RECEIVE_CURRENT_USER_FAILURE, payload: error});


export const saveCurrentUser = (currentUser) => {
    return (dispatch) => {
        dispatch(requestCurrentUser());
        dispatch(receiveCurrentUser(currentUser))
    }
};


export const postLogin = (username, password, props) => {
    return (dispatch) => {
        dispatch(requestCurrentUser());
        fetch('/api/auth', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
            .then((result) => {
                result.json().then((json) => {
                    const token = json.jwt;
                        // localStorage.setItem('jwtToken', token);
                        // dispatch(receiveCurrentUser(jwt.decode(token)));
                        // props.history.push('/');
                    auth.signInWithEmailAndPassword(username, password).then((cred) => {
                        console.log("Firebase Auth done. Cia yra firebase user info:");
                        console.log(cred.user);
                        console.log("");
                        auth.currentUser.getIdToken(true).then((idToken) => {
                            localStorage.setItem('jwtToken', token);
                            localStorage.setItem('firebaseToken', idToken);
                            dispatch(receiveCurrentUser(jwt.decode(token)));
                            props.history.push('/')
                        }).catch((error) => {
                            console.log("getIdToken error...")
                        });
                    }).catch((error) => {
                        // localStorage.removeItem('jwtToken');
                        // localStorage.removeItem('firebaseToken');
                        dispatch(receiveCurrentUserFailure('firebase login Failed'));
                    });
                });
            })
            .catch((error) => {
                dispatch(receiveCurrentUserFailure(error))
            });
    }
};

export default function setHeaders(headers) {
    if ((localStorage.jwtToken) && (localStorage.firebaseToken)) {
        return {
            ...headers,
            'Authorization': `Bearer ${localStorage.jwtToken}`,
            'Firebase': `Bearer ${localStorage.firebaseToken}`
        }
    } else {
        return headers;
    }
}