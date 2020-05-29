import {CurrentUserState} from "./dataTypes/CurrentUserState";
import {BookState} from "./dataTypes/BookState";
import {OrderState} from "./dataTypes/OrderState";
import {UserState} from "./dataTypes/UserState";

interface IInitialState {
    book: BookState;
    user: UserState;
    order: OrderState;
    currentUser: CurrentUserState;
    firebase: any;
}

const initialState: IInitialState = {
    book: {
        isFetching: false,
        data: [],
        error: '',
    },

    user: {
        isFetching: false,
        data: [],
        error: '',
    },

    order: {
        isFetching: false,
        data: [],
        error: '',
    },

    currentUser: {
        isFetching: false,
        isAuthenticated: false,
        data: {exp: -1, surnameFirstLetter: '', sub: '', nameFirstLetter: '', iat: -1, roles: []},
        error: '',
    },

    firebase: {
        isAuthenticated: false,
        data: [],
        error: '',
    },
};

export default initialState;
