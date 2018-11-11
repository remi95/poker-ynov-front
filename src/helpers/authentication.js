import Cookies from 'js-cookie';
import store from "../store";
import {checkToken} from "../actions/authAction";

export const authenticate = (redirect) => {
    if (store.getState().userReducer.token) {
        return true;
    }
    else if (Cookies.get('user-token')) {
        store.dispatch(checkToken(Cookies.get('user-token'), redirect));
    }

    return false
};
