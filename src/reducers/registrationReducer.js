import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL } from "../constants";

let initialState = {
    isLoading: false,
    user: {},
    token: '',
    isLoged: false,
    error: ''
};

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                user: action.user,
                isLoged: false
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.user,
                token: action.token,
                isLoged: true,
                error: ''
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoading: false,
                isLoged: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default registrationReducer;