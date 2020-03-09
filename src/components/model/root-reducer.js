import {combineReducers} from 'redux';
import bookReducer from './reducers/book-reducer'
import userReducer from "./reducers/user-reducer";
import orderReducer from "./reducers/order-reducer";

const rootReducer = combineReducers({
    book: bookReducer,
    user: userReducer,
    order: orderReducer
});

export default rootReducer;