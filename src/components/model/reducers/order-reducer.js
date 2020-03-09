import {cloneDeep} from "lodash";
import initialState from "../initial-state";
import {
    RECEIVE_ADD_ORDER,
    RECEIVE_ADD_ORDER_FAILURE, RECEIVE_ORDER_LIST, RECEIVE_ORDER_LIST_FAILURE,
    REQUEST_ADD_ORDER,
    REQUEST_ORDER_LIST
} from "../actions/order-actions";



const orderReducer = (state = cloneDeep(initialState.order), action) => {
    switch (action.type) {

        //--------------GET ORDER LIST FROM  INTERNET ----------
        case REQUEST_ORDER_LIST: {
            return Object.assign({}, {
                ...state,
                isFetching: true,
                error: undefined,
            })
        }

        case RECEIVE_ORDER_LIST: {
            return Object.assign({}, {
                isFetching: false,
                error: undefined,
                data: action.payload,
            })
        }

        case RECEIVE_ORDER_LIST_FAILURE: {
            return Object.assign({}, {
                ...state,
                isFetching: false,
                error: action.payload,
            })
        }


        //--------------ADD NEW ORDER ---------------------------
        case REQUEST_ADD_ORDER: {
            return Object.assign({}, {
                ...state,
                isFetching: true,
                error: undefined,
            })
        }

        case RECEIVE_ADD_ORDER: {
            return Object.assign({}, {
                isFetching: false,
                error: undefined,
                data: [...state.data, action.payload]
            })
        }

        case RECEIVE_ADD_ORDER_FAILURE: {
            return Object.assign({}, {
                ...state,
                isFetching: false,
                error: action.payload,
            })
        }

        //-----------UPDATE ORDER ------------------------

        default:
            return state;

    }
};

export default orderReducer;