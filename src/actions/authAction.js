import {AUTH_ERROR, AUTH_SUCCESS} from "../constants";
import {pushAlert} from "./alertAction";
import {alert} from "../helpers/global";
import history from "../helpers/history";
import {apiUrl} from "../config";

export const success = (response) => {
    return {
        type: AUTH_SUCCESS,
        response
    }
};

export const fail = (errors) => {
    return {
        type: AUTH_ERROR,
        errors
    }
};

export const login = (userInfo) => {
    return async (dispatch) => {
        try {
            const response = await fetch(apiUrl + '/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            });

            if (!response.ok) {
                throw response;
            }

            const json = await response.json();
            sessionStorage.setItem('appToken', json.token);

            dispatch(success(json));
            dispatch(pushAlert(alert('success', 'Bonjour ' + json.user.username)));
            history.push('/')
        }
        catch (e) {
            dispatch(pushAlert(alert('error', 'Mauvais identifiants')));
        }
    }
};