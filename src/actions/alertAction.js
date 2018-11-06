import {ALERT_PUSH} from "../constants";

export const pushAlert = (alert) => {
    return {
        type: ALERT_PUSH,
        alert
    }
};