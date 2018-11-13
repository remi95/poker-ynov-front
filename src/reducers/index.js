import { combineReducers } from 'redux';
import userReducer from './userReducer';
import alertReducer from './alertReducer';
import modalReducer from './modalReducer';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({
    userReducer,
    alertReducer,
    modalReducer,
    gameReducer,
});

export default rootReducer;