import {cloneDeep} from "lodash";
import initialState from "../initial-state";
import {RECEIVE_CURRENT_USER, RECEIVE_CURRENT_USER_FAILURE, REQUEST_CURRENT_USER} from "../actions/login-action";


const loginReducer = (state = cloneDeep(initialState.currentUser), action) => {
    switch (action.type) {


        //--------------POST LOGIN ---------------------------
        case REQUEST_CURRENT_USER: {
            return Object.assign({}, {
                ...state,
                error: undefined,
            })
        }

        case RECEIVE_CURRENT_USER: {
            console.log('Atejau i loginReducer ' + action.payload);
            return Object.assign({}, {
                isAuthenticated: true,
                error: undefined,
                data: action.payload
            })
        }

        case RECEIVE_CURRENT_USER_FAILURE: {
            return Object.assign({}, {
                ...state,
                isAuthenticated: false,
                error: action.payload,
            })
        }

        default:
            return state;
    }
};

export default loginReducer;