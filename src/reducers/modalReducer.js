import { OPEN_MODAL, CLOSE_MODAL } from "../constants";

let initialState = {
    isOpen: false
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                isOpen: true
            };
        case CLOSE_MODAL:
            return {
                ...state,
                isOpen: false
            };
        default:
            return state;
    }
};

export default modalReducer;