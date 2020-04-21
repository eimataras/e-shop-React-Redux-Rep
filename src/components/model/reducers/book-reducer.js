import {cloneDeep} from "lodash";
import initialState from "../initial-state";
import {
    RECEIVE_ADD_BOOK,
    RECEIVE_ADD_BOOK_FAILURE,
    RECEIVE_BOOK_LIST,
    RECEIVE_BOOK_LIST_FAILURE,
    RECEIVE_DELETE_BOOK,
    RECEIVE_DELETE_BOOK_FAILURE,
    REQUEST_ADD_BOOK,
    REQUEST_BOOK_LIST,
    REQUEST_DELETE_BOOK
} from "../actions/book-actions";


const bookReducer = (state = cloneDeep(initialState.book), action) => {
    switch (action.type) {

        //--------------GET BOOK LIST FROM  INTERNET ----------
        case REQUEST_BOOK_LIST: {
            return Object.assign({}, {
                ...state,
                isFetching: true,
                error: undefined,
            })
        }

        case RECEIVE_BOOK_LIST: {
            return Object.assign({}, {
                isFetching: false,
                error: undefined,
                data: action.payload,
            })
        }

        case RECEIVE_BOOK_LIST_FAILURE: {
            return Object.assign({}, {
                ...state,
                isFetching: false,
                error: action.payload,
            })
        }


        //--------------ADD NEW BOOK ---------------------------
        case REQUEST_ADD_BOOK: {
            return Object.assign({}, {
                ...state,
                isFetching: true,
                error: undefined,
            })
        }

        case RECEIVE_ADD_BOOK: {
            return Object.assign({}, {
                isFetching: false,
                error: undefined,
                data: [...state.data, action.payload]
            })
        }

        case RECEIVE_ADD_BOOK_FAILURE: {
            return Object.assign({}, {
                ...state,
                isFetching: false,
                error: action.payload,
            })
        }


        //-----------DELETE BOOK ------------------------
        case REQUEST_DELETE_BOOK: {
            return Object.assign({}, {
                ...state,
                isFetching: true,
                error: undefined,
            })
        }

        case RECEIVE_DELETE_BOOK: {
            return Object.assign({}, {
                isFetching: false,
                error: undefined,
                data: [...state.data.filter(book => {
                    return book.book_id !== action.payload
                })]
            })
        }

        case RECEIVE_DELETE_BOOK_FAILURE: {
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

export default bookReducer;