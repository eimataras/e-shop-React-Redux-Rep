export const REQUEST_POST_LOGIN = 'REQUEST_POST_LOGIN';
export const RECEIVE_POST_LOGIN = 'RECEIVE_POST_LOGIN';
export const RECEIVE_POST_LOGIN_FAILURE = 'RECEIVE_POST_LOGIN_FAILURE';

export const requestPostLogin = () => ({type: REQUEST_POST_LOGIN,});
export const receivePostLogin = (json) => ({type: RECEIVE_POST_LOGIN, payload: json});
export const receivePostLoginFailure = (error) => ({type: RECEIVE_POST_LOGIN_FAILURE, payload: error});




export const postLogin = (username, password) => {
    console.log('Atejau iki action postLogin: ' + username);
    return (dispatch) =>  {

        dispatch(requestPostLogin());
        fetch('http://localhost:8080/login', {
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
                    dispatch(receivePostLogin(json));
                    console.log('Response postLogin json:');
                    console.log(json);
                });
            })
            .catch((error) => {
                dispatch(receivePostLoginFailure(error))
            });
    }
};