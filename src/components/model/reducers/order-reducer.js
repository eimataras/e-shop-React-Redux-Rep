import {cloneDeep} from "lodash";
import initialState from "../initial-state";
import {
    RECEIVE_ADD_ORDER,
    RECEIVE_ADD_ORDER_FAILURE, RECEIVE_DELETE_ORDER, RECEIVE_DELETE_ORDER_FAILURE,
    RECEIVE_ORDER_LIST,
    RECEIVE_ORDER_LIST_FAILURE,
    RECEIVE_UPDATE_ORDER,
    RECEIVE_UPDATE_ORDER_FAILURE,
    REQUEST_ADD_ORDER, REQUEST_DELETE_ORDER,
    REQUEST_ORDER_LIST,
    REQUEST_UPDATE_ORDER
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
        case REQUEST_UPDATE_ORDER: {
            return Object.assign({}, {
                ...state,
                isFetching: true,
                error: undefined,
            })
        }
        case RECEIVE_UPDATE_ORDER: {
            const newData = state.data.map((order) => order.order_id === action.payload.order_id ? action.payload : order);
            return Object.assign({}, {
                isFetching: false,
                error: undefined,
                data: newData
            })
        }
        case RECEIVE_UPDATE_ORDER_FAILURE: {
            return Object.assign({}, {
                ...state,
                isFetching: false,
                error: action.payload,
            })
        }


        //-----------DELETE ORDER ------------------------
        case REQUEST_DELETE_ORDER: {
            return Object.assign({}, {
                ...state,
                isFetching: true,
                error: undefined,
            })
        }
        case RECEIVE_DELETE_ORDER: {
            console.log('Atejau i reduceri deleteOrder ' + action.payload);
            console.log(state.data);
            const data = state.data.filter(order => {
                return order.order_id !== action.payload
            });
            return Object.assign({}, {
                isFetching: false,
                error: undefined,
                data: data,
            });
        }
        case RECEIVE_DELETE_ORDER_FAILURE: {
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

export default orderReducer;