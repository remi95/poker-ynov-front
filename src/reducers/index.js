import { combineReducers } from 'redux';
import userReducer from './userReducer';
import alertReducer from './alertReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
    userReducer,
    alertReducer,
    modalReducer
});

export default rootReducer;