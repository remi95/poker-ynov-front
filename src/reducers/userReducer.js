import {AUTH_LOADING, AUTH_SUCCESS} from "../constants";

let initialState = {
    user: {},
    token: null,
    loading: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                user: action.response.user,
                token: action.response.token,
                loading: false,
            };
        case AUTH_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default userReducer;