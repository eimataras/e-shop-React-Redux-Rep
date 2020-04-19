import {cloneDeep} from "lodash";
import initialState from "../initial-state";
import {
    RECEIVE_CURRENT_USER,
    RECEIVE_CURRENT_USER_FAILURE, RECEIVE_DEFAULT_CURRENT_USER,
    REQUEST_CURRENT_USER
} from "../actions/login-action";


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
            console.log('Atejau i loginReducer. Cia yra decodintas token: ');
            console.log(action.payload);
            console.log('Pasidedam ji i redux store kaip currentUser ir naudojam kur reikia.');
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

        case RECEIVE_DEFAULT_CURRENT_USER: {
            return Object.assign({}, {
                isAuthenticated: false,
                error: '',
                data: []
            })
        }

        default:
            return state;
    }
};

export default loginReducer;