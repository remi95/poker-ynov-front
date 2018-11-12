import {AUTH_LOADING, AUTH_SUCCESS} from "../constants";
import {pushAlert} from "./alertAction";
import {alert} from "../helpers/global";
import history from "../helpers/history";
import Cookies from 'js-cookie';
import client from "../clients/apiClient";

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
    return userPostRequest(user, 'login')
};

export const postUser = (user) => {
    return userPostRequest(user, 'signup')
};

export const checkToken = (token, redirect) => {
    return userPostRequest({token}, 'user/token', redirect)
};

const userPostRequest = (user, endpoint, redirect = '/') => {
    return async (dispatch) => {
        dispatch(loading(true));

        const request = await client.post(endpoint, user);

        if (request.status) {
            dispatch(login(request.data, redirect));
        }
        else {
            dispatch(pushAlert(alert('error', request.data.message)));
        }
    }
};

export const login = (userInfo, redirect) => {
    return async (dispatch) => {
        Cookies.set('user-token', userInfo.token, { expires: 7 });

        dispatch(success(userInfo));
        dispatch(pushAlert(alert('success', 'Bonjour ' + userInfo.user.username)));

        if (redirect) {
            history.push(redirect)
        }
    }
};