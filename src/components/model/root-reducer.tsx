import { combineReducers } from 'redux';
import bookReducer from './reducers/book-reducer';
import userReducer from './reducers/user-reducer';
import orderReducer from './reducers/order-reducer';
import loginReducer from './reducers/login-reducer';
import firebaseReducer from './reducers/firebase-reducer';

const rootReducer = combineReducers({
    book: bookReducer,
    user: userReducer,
    order: orderReducer,
    currentUser: loginReducer,
    firebase: firebaseReducer,
});

export default rootReducer;
