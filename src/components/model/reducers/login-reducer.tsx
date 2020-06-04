import { cloneDeep } from 'lodash';
import initialState from '../initial-state';
import { RECEIVE_CURRENT_USER, RECEIVE_CURRENT_USER_FAILURE, REQUEST_CURRENT_USER } from '../actions/login-action';


const loginReducer = (state = cloneDeep(initialState.currentUser), action) => {
    switch (action.type) {
    // --------------POST LOGIN ---------------------------
        case REQUEST_CURRENT_USER: {
            return {
                ...state,
                isFetching: true,
                error: undefined,
            };
        }

        case RECEIVE_CURRENT_USER: {
            return {
                isFetching: false,
                isAuthenticated: !!action.payload,
                error: undefined,
                data: action.payload ? action.payload : null,
            };
        }

        case RECEIVE_CURRENT_USER_FAILURE: {
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                error: action.payload,
            };
        }

        default:
            return state;
    }
};

export default loginReducer;
