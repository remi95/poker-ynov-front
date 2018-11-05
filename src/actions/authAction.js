import {AUTH_ERROR, AUTH_SUCCESS} from "../constants";

export const succes = (response) => {
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
            const response = await fetch('http://localhost:1337/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            });
            const json = await response.json();

            dispatch(succes(json))
        }
        catch (e) {
            dispatch(fail(e))
        }
    }
};