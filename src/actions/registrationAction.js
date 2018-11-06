import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL } from "../constants";
import { apiUrl } from "../config";

const request = (user) => {
    return {
        type: REGISTER_REQUEST,
        user
    }
};

const success = (user, token) => {
    return {
        type: REGISTER_SUCCESS,
        user,
        token
    }
};

const fail = (error) => {
    return {
        type: REGISTER_FAIL,
        error
    }
};

const postUser = async (user, dispatch) => {
    try {
        const res = await fetch(`${apiUrl}/signup`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const jsonRes = await res.json();
        if (!res.ok) return dispatch(fail(jsonRes.message));

        const token = jsonRes.token;
        sessionStorage.setItem('appToken', token);
        return dispatch(success(jsonRes.user, token));
    }
    catch (e) {
        return dispatch(fail(e.message));
    }
};

export const registerUser = (user) => {
    return dispatch => {
        dispatch(request(user));
        return postUser(user, dispatch);
    }
};