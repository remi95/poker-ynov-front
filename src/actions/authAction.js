import {GET_AUTH_USER} from "../constants";

export const getUser = (user) => {
    return {
        type: GET_AUTH_USER,
        user
    }
};