import { combineReducers } from 'redux';
import userReducer from './userReducer';
import alertReducer from './alertReducer';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({
    userReducer,
    alertReducer,
    gameReducer,
});

export default rootReducer;