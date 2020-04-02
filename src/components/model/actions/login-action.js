import jwt from 'jsonwebtoken';

export const REQUEST_CURRENT_USER = 'REQUEST_CURRENT_USER';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_CURRENT_USER_FAILURE = 'RECEIVE_CURRENT_USER_FAILURE';

export const requestCurrentUser = () => ({type: REQUEST_CURRENT_USER,});
export const receiveCurrentUser = (user) => ({type: RECEIVE_CURRENT_USER, payload: user});
export const receiveCurrentUserFailure = (error) => ({type: RECEIVE_CURRENT_USER_FAILURE, payload: error});



export const postLogin = (username, password) => {
    console.log('Atejau iki action postLogin: ' + username + password);
    return (dispatch) =>  {

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
                    console.log(token);
                    localStorage.setItem('jwtToken', token);
                    console.log(`JWT in local storage: ${localStorage.jwtToken}`);
                    console.log(jwt.decode(token));
                    dispatch(receiveCurrentUser(jwt.decode(token)));
                });
            })
            .catch((error) => {
                dispatch(receiveCurrentUserFailure(error))
            });
    }
};

export default function setHeaders(headers) {
    if(localStorage.jwtToken) {
        return {
            ...headers,
            'Authorization': `Bearer ${localStorage.jwtToken}`
        }
    } else {
        return headers;
    }
}