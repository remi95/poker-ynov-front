import {ALERT_PUSH} from "../constants";

let initialState = {
    type: null,
    message: null,
};

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALERT_PUSH:
            return {
                ...state,
                type: action.alert.type,
                message: action.alert.message,
            };
        default:
            return state;
    }
};

export default alertReducer;