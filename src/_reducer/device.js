import * as _Action from './_action';
import * as _AppUtil from '../_util/AppUtil';

import Sensor from '../entity/Sensor';
import Device from '../entity/Device';

const initialState = {
    sensorList: [],
    deviceList: [], totalPages: 1,
    sensor: new Sensor(),
    device: new Device()
}

export function deviceReducer(state = initialState, action) {
    switch (action.type) {
        case _Action.SET_DEVICE: {
            action.data.sensorList.forEach(function (entry) {
                entry.uuid = _AppUtil.generateUUID();
            });
            return Object.assign({}, state, {
                device: action.data, sensorList: action.data.sensorList
            });
        }

        case _Action.PAGE_DEVICE: {
            return Object.assign({}, state, {
                deviceList: action.data.content, totalPages: action.data.totalPages
            });
        }

        case _Action.ADD_DEVICE: {
            return Object.assign({}, state, {
                deviceList: [
                    ...state.deviceList
                ]
            });
        }

        case _Action.EDIT_DEVICE: {
            let tempArray = state.deviceList;
            tempArray[state.deviceList.findIndex(obj => obj.id === action.data.id)] = action.data;
            return Object.assign({}, state, {
                deviceList: tempArray
            });
        }

        case _Action.RESET_DEVICE: {
            return Object.assign({}, state, {
                device: new Device(), sensorList: []
            });
        }

        case _Action.ADD_SENSOR: {
            if (action.data.uuid === null || action.data.uuid === undefined) {
                action.data.uuid = _AppUtil.generateUUID();
            }
            return Object.assign({}, state, {
                sensorList: [
                    ...state.sensorList,
                    action.data
                ]
            });
        }

        case _Action.EDIT_SENSOR: {
            let tempArray = state.sensorList;
            tempArray[state.sensorList.findIndex(obj => obj.uuid === action.data.uuid)] = action.data;
            return Object.assign({}, state, {
                sensorList: tempArray
            });
        }

        case _Action.SET_SENSOR: {
            let sensor = state.sensorList.filter(obj => obj.uuid === action.data)[0];
            return Object.assign({}, state, {
                sensor: new Sensor(sensor.uuid, sensor.id, sensor.name, sensor.oid, sensor.interval, sensor.status)
            });
        }

        case _Action.REM_SENSOR: {
            return Object.assign({}, state, {
                sensorList: [
                    ...state.sensorList.filter(obj => obj.uuid !== action.data)
                ]
            });
        }

        case _Action.RESET_SENSOR: {
            return Object.assign({}, state, {
                sensor: new Sensor()
            });
        }

        default:
            return state;
    }
}
