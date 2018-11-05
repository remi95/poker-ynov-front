import { combineReducers } from 'redux';
import userReducer from '../reducers/authUser';
import registrationReducer from '../reducers/registrationReducer';

const rootReducer = combineReducers({
    userReducer,
    registrationReducer
});

export default rootReducer;