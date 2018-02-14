import { combineReducers } from 'redux';
import { deviceReducer } from './device';
import { configurationReducer } from './configuration'
import { deviceProfileReducer } from './deviceProfile'

const rootReducer = combineReducers({
    deviceReducer: deviceReducer,
    configurationReducer: configurationReducer,
    deviceProfileReducer: deviceProfileReducer
});

export default rootReducer;