import {ALERT_PUSH, CLEAR_ALERT} from "../constants";

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
        case CLEAR_ALERT:
            return {
                ...state = initialState
            };
        default:
            return state;
    }
};

export default alertReducer;