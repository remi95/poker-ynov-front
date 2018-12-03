import {ALERT_PUSH, CLEAR_ALERT} from "../constants";

/**
 * Display an alert.
 *
 * @param alert
 *   Object with type and message.
 * @param timeout
 *   Time in ms during which the alert appears.
 *
 * @returns {function(*): *}
 */
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