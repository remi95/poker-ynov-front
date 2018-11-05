import { GET_AUTH_USER } from "../constants";

let initialState = {
    user: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_AUTH_USER:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
};

export default userReducer;