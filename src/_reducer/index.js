import { combineReducers } from 'redux';
import { deviceReducer } from './device';
import { enumReducer } from './enum';

const rootReducer = combineReducers({
    deviceReducer: deviceReducer,
    enumReducer: enumReducer
});

export default rootReducer;