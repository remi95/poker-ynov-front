import {AUTH_LOADING, AUTH_SUCCESS} from "../constants";
import {pushAlert} from "./alertAction";
import {alert} from "../helpers/global";
import history from "../helpers/history";
import {API_URL} from "../config";

const success = (response) => {
    return {
        type: AUTH_SUCCESS,
        response
    }
};

const loading = (bool) => {
    return {
        type: AUTH_LOADING,
        bool
    }
};

export const checkUser = (user) => {
    return userRequest(user, 'login')
};

export const postUser = (user) => {
    return userRequest(user, 'signup')
};

const userRequest = (user, endpoint) => {
    return async (dispatch) => {
        try {
            dispatch(loading(true));
            const response = await fetch(`${API_URL}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });

            const json = await response.json();

            if (!response.ok) {
                throw json;
            }

            dispatch(login(json))
        }
        catch (e) {
            dispatch(pushAlert(alert('error', e.message)));
        }
    }
};

const login = (userInfo) => {
    return async (dispatch) => {
        sessionStorage.setItem('appToken', userInfo.token);

        dispatch(success(userInfo));
        dispatch(pushAlert(alert('success', 'Bonjour ' + userInfo.user.username)));
        history.push('/')
    }
};