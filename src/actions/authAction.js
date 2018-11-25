import {AUTH_LOADING, AUTH_SUCCESS, LOGOUT} from "../constants";
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

const logout = () => {
    return {
        type: LOGOUT
    }
};

const loading = (bool) => {
    return {
        type: AUTH_LOADING,
        bool
    }
};

export const checkUser = (user) => {
    return userPostRequest(user, '/login')
};

export const postUser = (user) => {
    return userPostRequest(user, '/signup')
};

export const checkToken = (token, redirect) => {
    return userPostRequest({token}, '/user/token', redirect)
};

export const logoutAndRedirect = () => {
    return async(dispatch) => {
        Cookies.remove('user-token');

        dispatch(logout());
        dispatch(pushAlert(alert('success', 'Vous avez bien été déconnecté. A bientôt !')));
        history.push('/login');
    }
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

const login = (userInfo, redirect) => {
    return async (dispatch) => {
        Cookies.set('user-token', userInfo.token, { expires: 7 });

        dispatch(loading(false));
        dispatch(success(userInfo));
        dispatch(pushAlert(alert('success', 'Bonjour ' + userInfo.user.username)));

        if (redirect) {
            history.push(redirect)
        }
    }
};