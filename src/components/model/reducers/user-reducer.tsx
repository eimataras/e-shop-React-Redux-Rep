import { cloneDeep } from 'lodash';
import initialState from '../initial-state';
import {
  RECEIVE_ADD_USER,
  RECEIVE_ADD_USER_FAILURE,
  RECEIVE_DELETE_USER,
  RECEIVE_DELETE_USER_FAILURE,
  RECEIVE_USER_LIST,
  RECEIVE_USER_LIST_FAILURE,
  REQUEST_ADD_USER,
  REQUEST_DELETE_USER,
  REQUEST_USER_LIST,
} from '../actions/user-actions';


const userReducer = (state = cloneDeep(initialState.user), action) => {
  switch (action.type) {
    // --------------GET USER LIST FROM  INTERNET ----------
    case REQUEST_USER_LIST: {
      return {
        ...state,
        isFetching: true,
        error: undefined,
      };
    }

    case RECEIVE_USER_LIST: {
      return {
        isFetching: false,
        error: undefined,
        data: action.payload,
      };
    }

    case RECEIVE_USER_LIST_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    }


    // --------------ADD NEW USER ---------------------------
    case REQUEST_ADD_USER: {
      return {
        ...state,
        isFetching: true,
        error: undefined,
      };
    }

    case RECEIVE_ADD_USER: {
      return {
        isFetching: false,
        error: undefined,
        data: [...state.data, action.payload],
      };
    }

    case RECEIVE_ADD_USER_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    }

    // -----------DELETE USER ------------------------
    case REQUEST_DELETE_USER: {
      return {
        ...state,
        isFetching: true,
        error: undefined,
      };
    }

    case RECEIVE_DELETE_USER: {
      const data = state.data.filter((user) => user.user_id !== action.payload);
      return {
        isFetching: false,
        error: undefined,
        data,
      };
    }

    case RECEIVE_DELETE_USER_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
