import * as _Action from './_action';

const initialState = {
    sensor_intervalList: [],
    device_snmpList: []
}

export function enumReducer(state = initialState, action) {
    switch (action.type) {
        case _Action.LIST_SNMP: {
            return Object.assign({}, state, {
                device_snmpList: action.data
            });
        }

        case _Action.LIST_INTERVAL: {
            return Object.assign({}, state, {
                sensor_intervalList: action.data
            });
        }

        default:
            return state;
    }
}
