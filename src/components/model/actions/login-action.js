// export const REQUEST_FETCH_LOGIN = 'REQUEST_FETCH_LOGIN';
// export const RECEIVE_FETCH_LOGIN = 'RECEIVE_FETCH_LOGIN';
// export const RECEIVE_FETCH_LOGIN_FAILURE = 'RECEIVE_FETCH_LOGIN_FAILURE';
//
// export const requestFetchLogin = () => ({type: REQUEST_FETCH_LOGIN,});
// export const receiveFetchLogin = (json) => ({type: RECEIVE_FETCH_LOGIN, payload: json});
// export const receiveFetchLoginFailure = (error) => ({type: RECEIVE_FETCH_LOGIN_FAILURE, payload: error});
//
//
// export const REQUEST_POST_LOGIN = 'REQUEST_POST_LOGIN';
// export const RECEIVE_POST_LOGIN = 'RECEIVE_POST_LOGIN';
// export const RECEIVE_POST_LOGIN_FAILURE = 'RECEIVE_POST_LOGIN_FAILURE';
//
// export const requestPostLogin = () => ({type: REQUEST_POST_LOGIN,});
// export const receivePostLogin = (json) => ({type: RECEIVE_POST_LOGIN, payload: json});
// export const receivePostLoginFailure = (error) => ({type: RECEIVE_POST_LOGIN_FAILURE, payload: error});
//
//
// export const fetchLogin = () => {
//     return (dispatch) => {
//         dispatch(requestFetchLogin());
//         fetch('/auth', {method: 'get'})
//             .then((result) => {
//                 result.json().then((json) => {
//                     dispatch(receiveFetchLogin(json))
//                 })
//             })
//             .catch((error) => {
//                 dispatch(receiveFetchLoginFailure(error))
//             })
//     }
// };
//
//
//
// export const postLogin = (username, password) => {
//     console.log('Atejau iki action postLogin: ' + username + password);
//     return (dispatch) =>  {
//
//         dispatch(requestPostLogin());
//         fetch('/login', {
//             method: 'post',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username: username,
//                 password: password,
//             })
//         })
//             .then((result) => {
//                 result.json().then((json) => {
//                     dispatch(receivePostLogin(json));
//                     console.log('Response postLogin json:');
//                     console.log(json);
//                 });
//             })
//             .catch((error) => {
//                 dispatch(receivePostLoginFailure(error))
//             });
//     }
// };