// import {cloneDeep} from "lodash";
// import initialState from "../initial-state";
// import {
//     RECEIVE_FETCH_LOGIN, RECEIVE_FETCH_LOGIN_FAILURE,
//     RECEIVE_POST_LOGIN,
//     RECEIVE_POST_LOGIN_FAILURE,
//     REQUEST_FETCH_LOGIN,
//     REQUEST_POST_LOGIN
// } from "../actions/login-action";
//
//
// const loginReducer = (state = cloneDeep(initialState.login), action) => {
//     switch (action.type) {
//
//         //--------------GET LOGIN USER DETAILS FROM  INTERNET ----------
//         case REQUEST_FETCH_LOGIN: {
//             return Object.assign({}, {
//                 ...state,
//                 isFetching: true,
//                 error: undefined,
//             })
//         }
//
//         case RECEIVE_FETCH_LOGIN: {
//             return Object.assign({}, {
//                 isFetching: false,
//                 error: undefined,
//                 data: action.payload,
//             })
//         }
//
//         case RECEIVE_FETCH_LOGIN_FAILURE: {
//             return Object.assign({}, {
//                 ...state,
//                 isFetching: false,
//                 error: action.payload,
//             })
//         }
//
//
//
//         //--------------ADD NEW USER ---------------------------
//         case REQUEST_POST_LOGIN: {
//             return Object.assign({}, {
//                 ...state,
//                 isFetching: true,
//                 error: undefined,
//             })
//         }
//
//         case RECEIVE_POST_LOGIN: {
//             console.log('Atejau i reduceri postLogin ' + action.payload);
//             return Object.assign({}, {
//                 isFetching: false,
//                 error: undefined,
//                 data: [...state.data, action.payload]
//             })
//         }
//
//         case RECEIVE_POST_LOGIN_FAILURE: {
//             return Object.assign({}, {
//                 ...state,
//                 isFetching: false,
//                 error: action.payload,
//             })
//         }
//
//         default:
//             return state;
//     }
// };
//
// export default loginReducer;