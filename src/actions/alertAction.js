import {ALERT_PUSH, CLEAR_ALERT} from "../constants";

export const pushAlert = (alert) => {
    return dispatch => {
        setTimeout( () => dispatch(clearAlert()), 5000);
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