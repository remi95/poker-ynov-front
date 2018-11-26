import {ALERT_PUSH, CLEAR_ALERT} from "../constants";

export const pushAlert = (alert, timeout = 5000) => {
    return dispatch => {
        setTimeout( () => dispatch(clearAlert()), timeout);
        return dispatch({
            type: ALERT_PUSH,
            alert
        });
    }
};

const clearAlert = () => {
    return {
        type: CLEAR_ALERT
    }
};