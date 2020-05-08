import jwt from 'jsonwebtoken';

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


export const postLogin = (props, idToken) => {
    return (dispatch) => {
        dispatch(requestCurrentUser());
        fetch('/api/auth', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idToken: idToken
            })
        })
            .then((result) => {
                result.json().then((json) => {
                    const token = json.jwt;
                    localStorage.setItem('jwtToken', token);
                    localStorage.setItem('firebaseToken', idToken);
                    dispatch(receiveCurrentUser(jwt.decode(token)));
                    props.history.push('/');
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