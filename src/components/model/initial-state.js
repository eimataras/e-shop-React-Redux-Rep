const initialState = {
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
        isAuthenticated: false,
        data: [],
        error: '',
    }
};

export default initialState;