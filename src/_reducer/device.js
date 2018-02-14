import { List } from 'immutable';

import * as _Action from './_action';
import * as _AppUtil from '../_util/AppUtil';

import Sensor from '../entity/Sensor';
import Device from '../entity/Device';

const initialState = {
    sensorList: new List(),
    deviceList: [], totalPages: 1,
    device_sifCollectorList: [],
    device_authenticationProfileList: [],
    device_communityProfileList: [],
    sensor: new Sensor(),
    device: new Device(),
    sensor_intervalList: [],
    device_snmpList: [],
    device_sensorKindList: [],
    tabKey: 1
}

export function deviceReducer(state = initialState, action) {
    switch (action.type) {
        case _Action.SET_TABKEY: {
            return Object.assign({}, state, {
                tabKey: action.data
            });
        }

        case _Action.LIST_DEVICEAUTHPROFILE: {
            return Object.assign({}, state, {
                device_authenticationProfileList: action.data
            });
        }

        case _Action.LIST_DEVICEPROFILECOMMUNITY: {
            return Object.assign({}, state, {
                device_communityProfileList: action.data
            });
        }

        case _Action.LIST_SNMP: {
            return Object.assign({}, state, {
                device_snmpList: action.data
            });
        }

        case _Action.LIST_SENSORKIND: {
            return Object.assign({}, state, {
                device_sensorKindList: action.data
            });
        }

        case _Action.LIST_INTERVAL: {
            return Object.assign({}, state, {
                sensor_intervalList: action.data
            });
        }

        case _Action.LIST_SIFCOLLECTOR: {
            return Object.assign({}, state, {
                device_sifCollectorList: action.data
            });
        }

        case _Action.SET_DEVICE: {
            let tempArray = action.data.sensorList;
            tempArray.filter(function (entry) {
                entry.uuid = _AppUtil.generateUUID();
            });
            return Object.assign({}, state, {
                device: action.data, sensorList: new List(tempArray)
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
                device: new Device(), sensorList: new List()
            });
        }

        case _Action.ADD_SENSOR: {
            if (action.data.uuid === null || action.data.uuid === undefined) {
                action.data.uuid = _AppUtil.generateUUID();
            }
            const tempArray = state.sensorList.concat(action.data);
            return Object.assign({}, state, {
                sensorList: tempArray
            });
        }

        case _Action.EDIT_SENSOR: {
            const tempArray = state.sensorList.update(
                state.sensorList.findIndex(function (item) {
                    return item.uuid === action.data.uuid;
                }), function (item) {
                    return item = action.data;
                }
            );
            return Object.assign({}, state, {
                sensorList: new List(tempArray)
            });
        }

        case _Action.SET_SENSOR: {
            let sensor = null;
            state.sensorList.findIndex(function (item) {
                if (item.uuid === action.data) {
                    sensor = item;
                }
            });
            return Object.assign({}, state, {
                sensor: new Sensor(sensor.uuid, sensor.id, sensor.name, sensor.oid, sensor.interval, sensor.status, sensor.sensorKind,
                    sensor.time, sensor.description, sensor.interval_shortened)
            });
        }

        case _Action.REM_SENSOR: {
            const tempArray = state.sensorList.filter(obj => obj.uuid !== action.data);
            if (state.sensor.uuid === action.data) {
                return Object.assign({}, state, {
                    sensorList: tempArray, sensor: new Sensor()
                });
            } else {
                return Object.assign({}, state, {
                    sensorList: tempArray
                });
            }
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
