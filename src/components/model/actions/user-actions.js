export const REQUEST_USER_LIST = 'REQUEST_USER_LIST';
export const RECEIVE_USER_LIST = 'RECEIVE_USER_LIST';
export const RECEIVE_USER_LIST_FAILURE = 'RECEIVE_USER_LIST_FAILURE';

export const requestUserList = () => ({type: REQUEST_USER_LIST,});
export const receiveUserList = (json) => ({type: RECEIVE_USER_LIST, payload: json});
export const receiveUserListFailure = (error) => ({type: RECEIVE_USER_LIST_FAILURE, payload: error});


export const REQUEST_ADD_USER = 'REQUEST_ADD_USER';
export const RECEIVE_ADD_USER = 'RECEIVE_ADD_USER';
export const RECEIVE_ADD_USER_FAILURE = 'RECEIVE_ADD_USER_FAILURE';

export const requestAddUser = () => ({type: REQUEST_ADD_USER,});
export const receiveAddUser = (json) => ({type: RECEIVE_ADD_USER, payload: json});
export const receiveAddUserFailure = (error) => ({type: RECEIVE_ADD_USER_FAILURE, payload: error});


export const REQUEST_DELETE_USER = 'REQUEST_DELETE_USER';
export const RECEIVE_DELETE_USER = 'RECEIVE_DELETE_USER';
export const RECEIVE_DELETE_USER_FAILURE = 'RECEIVE_DELETE_USER_FAILURE';

export const requestDeleteUser = () => ({type: REQUEST_DELETE_USER,});
export const receiveDeleteUser = (json) => ({type: RECEIVE_DELETE_USER, payload: json});
export const receiveDeleteUserFailure = (error) => ({type: RECEIVE_DELETE_USER_FAILURE, payload: error});


export const fetchUser = () => {
    return (dispatch) => {
        dispatch(requestUserList());
        fetch('/user/all', {method: 'get'})
            .then((result) => {
                result.json().then((json) => {
                    dispatch(receiveUserList(json))
                    console.log('Response fetchUser json:');
                    console.log(json);
                })
            })
            .catch((error) => {
                dispatch(receiveUserListFailure(error))
            })
    }
};


export const addClient = (user) => {
    console.log('Atejau iki action addUser: ' + user.name);
    return (dispatch) =>  {

        dispatch(requestAddUser());
        fetch('/user/add-client', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user.name,
                surname: user.surname,
                username: user.username,
                password: user.password,
            })
        })
            .then((result) => {
                result.json().then((json) => {
                    console.log('Response addClient json:');
                    console.log(json);
                    dispatch(receiveAddUser(json));
                });
            })
            .catch((error) => {
                dispatch(receiveAddUserFailure(error))
            });
    }
};


export const addAdmin = (user) => {
    console.log('Atejau iki action addUser: ' + user.name);
    return (dispatch) =>  {

        dispatch(requestAddUser());
        fetch('/user/add-admin', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user.name,
                surname: user.surname,
                username: user.username,
                password: user.password,
            })
        })
            .then((result) => {
                result.json().then((json) => {
                    dispatch(receiveAddUser(json));
                    console.log('Response addAdmin json:');
                    console.log(json);
                });
            })
            .catch((error) => {
                dispatch(receiveAddUserFailure(error))
            });
    }
};


export const deleteUser = (id) => {
    console.log('atejau iki action deleteUser ' + id);
    return (dispatch) => {
        dispatch(requestDeleteUser());
        fetch('/user/delete?user_id=' + id, {
            method: 'delete',
            body: JSON.stringify(id),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
            .then((result) => {
                result.json().then((json) => {
                    dispatch(receiveDeleteUser(json.user_id));
                    console.log('Response deleteUser json:');
                    console.log(json);
                })

            })
            .catch((error) => {
                dispatch(receiveDeleteUserFailure(error));
            })
    }
};