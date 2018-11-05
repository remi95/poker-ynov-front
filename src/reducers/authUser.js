import {AUTH_SUCCESS} from "../constants";

let initialState = {
    user: {},
    token: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                user: action.response.user,
                token: action.response.token,
            };
        default:
            return state;
    }
};

export default userReducer;