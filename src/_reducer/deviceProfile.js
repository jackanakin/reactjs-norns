import * as _Action from './_action';
import DeviceAuthenticationProfile from '../entity/DeviceAuthenticationProfile';
import DeviceProfileCommunity from '../entity/DeviceProfileCommunity';

const initialState = {
    deviceAuthenticationProfile: new DeviceAuthenticationProfile(),
    deviceAuthenticationProfileList: [],
    deviceProfileCommunity: new DeviceProfileCommunity(),
    deviceProfileCommunityList: []
}

export function deviceProfileReducer(state = initialState, action) {
    switch (action.type) {
        case _Action.REM_DEVICEAUTHPROFILE: {
            return Object.assign({}, state, {
                deviceAuthenticationProfileList: [
                    ...state.deviceAuthenticationProfileList.filter(obj => obj.id !== action.data)
                ]
            });
        }

        case _Action.SET_DEVICEAUTHPROFILE: {
            let obj = action.data;
            return Object.assign({}, state, {
                deviceAuthenticationProfile: new DeviceAuthenticationProfile(null, obj.id, obj.description, obj.username, obj.password, obj.status.id === 'ENABLED' ? true : false)
            });
        }

        case _Action.LIST_DEVICEAUTHPROFILE: {
            return Object.assign({}, state, {
                deviceAuthenticationProfileList: action.data
            });
        }

        case _Action.ADD_DEVICEAUTHPROFILE: {
            return Object.assign({}, state, {
                deviceAuthenticationProfileList: [
                    ...state.deviceAuthenticationProfileList,
                    action.data
                ]
            });
        }

        case _Action.RESET_DEVICEAUTHPROFILE: {
            return Object.assign({}, state, {
                deviceAuthenticationProfile: new DeviceAuthenticationProfile()
            });
        }

        case _Action.EDIT_DEVICEAUTHPROFILE: {
            let tempArray = state.deviceAuthenticationProfileList;
            tempArray[state.deviceAuthenticationProfileList.findIndex(obj => obj.id === action.data.id)] = action.data;
            return Object.assign({}, state, {
                deviceAuthenticationProfileList: tempArray
            });
        }

        ////
        case _Action.REM_DEVICEPROFILECOMMUNITY: {
            return Object.assign({}, state, {
                deviceProfileCommunityList: [
                    ...state.deviceProfileCommunityList.filter(obj => obj.id !== action.data)
                ]
            });
        }

        case _Action.SET_DEVICEPROFILECOMMUNITY: {
            let obj = action.data;
            return Object.assign({}, state, {
                deviceProfileCommunity: new DeviceProfileCommunity(null, obj.id, obj.description, obj.status.id === 'ENABLED' ? true : false)
            });
        }

        case _Action.LIST_DEVICEPROFILECOMMUNITY: {
            return Object.assign({}, state, {
                deviceProfileCommunityList: action.data
            });
        }

        case _Action.ADD_DEVICEPROFILECOMMUNITY: {
            return Object.assign({}, state, {
                deviceProfileCommunityList: [
                    ...state.deviceProfileCommunityList,
                    action.data
                ]
            });
        }

        case _Action.RESET_DEVICEPROFILECOMMUNITY: {
            return Object.assign({}, state, {
                deviceProfileCommunity: new DeviceProfileCommunity()
            });
        }

        case _Action.EDIT_DEVICEPROFILECOMMUNITY: {
            let tempArray = state.deviceProfileCommunityList;
            tempArray[state.deviceProfileCommunityList.findIndex(obj => obj.id === action.data.id)] = action.data;
            return Object.assign({}, state, {
                deviceProfileCommunityList: tempArray
            });
        }

        default:
            return state;
    }
}
