
import { combineReducers } from 'redux';
import { registerReducer } from './registerReducer';

const rootReducer = combineReducers({
    register: registerReducer
});

export default rootReducer;