import * as _Action from './_action';
import SifCollector from '../entity/SifCollector';

const initialState = {
    sifCollector: new SifCollector(), sifCollectorList: [],
    applicationName: '', resourcePath: '',
    datasourceUrl: '', datasourceUsername: ''
}

export function configurationReducer(state = initialState, action) {
    switch (action.type) {
        case _Action.REM_SIFCOLLECTOR: {
            return Object.assign({}, state, {
                sifCollectorList: [
                    ...state.sifCollectorList.filter(obj => obj.id !== action.data)
                ]
            });
        }

        case _Action.EDIT_SIFCOLLECTOR: {
            let tempArray = state.sifCollectorList;
            tempArray[state.sifCollectorList.findIndex(obj => obj.id === action.data.id)] = action.data;
            return Object.assign({}, state, {
                sifCollectorList: tempArray
            });
        }

        case _Action.SET_SIFCOLLECTOR: {
            let obj = action.data;
            return Object.assign({}, state, {
                sifCollector: new SifCollector(obj.id, obj.identifier, obj.description, obj.databaseUrl, obj.status.id === 'ENABLED' ? true : false)
            });
        }

        case _Action.LIST_SIFCOLLECTOR: {
            return Object.assign({}, state, {
                sifCollectorList: action.data
            });
        }

        case _Action.RESET_SIFCOLLECTOR: {
            return Object.assign({}, state, {
                sifCollector: new SifCollector()
            });
        }

        case _Action.ADD_SIFCOLLECTOR: {
            return Object.assign({}, state, {
                sifCollectorList: [
                    ...state.sifCollectorList,
                    action.data
                ]
            });
        }

        case _Action.LIST_CONFIGURATION: {
            return Object.assign({}, state, {
                applicationName: action.data.applicationName,
                resourcePath: action.data.resourcePath,
                datasourceUrl: action.data.datasourceUrl,
                datasourceUsername: action.data.datasourceUsername
            });
        }

        default:
            return state;
    }
}
