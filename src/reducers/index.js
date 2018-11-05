import { combineReducers } from 'redux';
import userReducer from '../reducers/authUser';

const rootReducer = combineReducers({
    userReducer,
});

export default rootReducer;