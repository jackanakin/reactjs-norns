import { combineReducers } from 'redux';
import { deviceReducer } from './device';
import { enumReducer } from './enum';
import { configurationReducer } from './configuration'

const rootReducer = combineReducers({
    deviceReducer: deviceReducer,
    enumReducer: enumReducer,
    configurationReducer: configurationReducer
});

export default rootReducer;