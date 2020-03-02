import {combineReducers} from 'redux';
import bookReducer from './reducers/book-reducer'
import userReducer from "./reducers/user-reducer";

const rootReducer = combineReducers({
    book: bookReducer,
    users: userReducer



});

export default rootReducer;