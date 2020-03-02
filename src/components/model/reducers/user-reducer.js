import {cloneDeep} from "lodash";
import initialState from "../initial-state";
import {
    RECEIVE_ADD_USER, RECEIVE_ADD_USER_FAILURE, RECEIVE_DELETE_USER, RECEIVE_DELETE_USER_FAILURE,
    RECEIVE_USER_LIST,
    RECEIVE_USER_LIST_FAILURE,
    REQUEST_ADD_USER, REQUEST_DELETE_USER,
    REQUEST_USER_LIST
} from "../actions/user-actions";


const userReducer = (state = cloneDeep(initialState.users), action) => {
    switch (action.type) {

        //--------------GET USER LIST FROM  INTERNET ----------
        case REQUEST_USER_LIST: {
            return Object.assign({}, {
                ...state,
                isFetching: true,
                error: undefined,
            })
        }

        case RECEIVE_USER_LIST: {
            return Object.assign({}, {
                isFetching: false,
                error: undefined,
                data: action.payload,
            })
        }

        case RECEIVE_USER_LIST_FAILURE: {
            return Object.assign({}, {
                ...state,
                isFetching: false,
                error: action.payload,
            })
        }


        //--------------ADD NEW USER ---------------------------
        case REQUEST_ADD_USER: {
            return Object.assign({}, {
                ...state,
                isFetching: true,
                error: undefined,
            })
        }

        case RECEIVE_ADD_USER: {
            console.log('Atejau i reduceri addUser ' + action.payload);
            return Object.assign({}, {
                isFetching: false,
                error: undefined,
                data: [...state.data, action.payload]
            })
        }

        case RECEIVE_ADD_USER_FAILURE: {
            return Object.assign({}, {
                ...state,
                isFetching: false,
                error: action.payload,
            })
        }

        //-----------DELETE USER ------------------------
        case REQUEST_DELETE_USER: {
            return Object.assign({}, {
                ...state,
                isFetching: true,
                error: undefined,
            })
        }
        case RECEIVE_DELETE_USER: {
            console.log('Atejau i reduceri deleteUser ' + action.payload);
            console.log(state.data);
            return Object.assign({}, {
                isFetching: false,
                error: undefined,
                data: [...state.data.filter(user => {
                    return user.user_id !== action.payload
                })]
            })
        }
        case RECEIVE_DELETE_USER_FAILURE: {
            return Object.assign({}, {
                ...state,
                isFetching: false,
                error: action.payload,
            })
        }

        default:
            return state;
    }

};

export default userReducer;