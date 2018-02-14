import $ from 'jquery';
import { toast } from 'react-toastify';

import * as _AppUtil from '../../_util/AppUtil';
import * as _action from '../../_reducer/_action';
import ErrorValidatorHandler from '../../_util/ErrorValidatorHandler';

export default class DeviceAuthProfileContainer {
    // AUTHENTICATION PROFILE
    ///////////////
    static fetchAllDeviceAuthenticationProfile = (successCallback) => {
        return dispatch => {
            $.ajax({
                url: `${_AppUtil.apiURL}device-profile/list-authentication-profile`,
                method: 'GET',
                dataType: 'json',
                statusCode: {
                    500: function (data) {
                        _AppUtil.HTTP500();
                    },
                    200: function (data) {
                        dispatch({ type: _action.LIST_DEVICEAUTHPROFILE, data });
                        successCallback();
                    },
                    0: function () {
                        _AppUtil.HTTP0();
                    }
                }
            });
        }
    }

    static removeDeviceAuthenticationProfile = (successCallback, id) => {
        return dispatch => {
            $.ajax({
                url: `${_AppUtil.apiURL}device-profile/remove-authentication-profile`,
                method: 'GET',
                contentType: 'application/json',
                data: { id: id },
                statusCode: {
                    500: function (data) {
                        _AppUtil.HTTP500();
                    },
                    200: function (data) {
                        dispatch({ type: _action.REM_DEVICEAUTHPROFILE, data: id });
                        dispatch({ type: _action.RESET_DEVICEAUTHPROFILE });
                        successCallback();
                        toast.info("Perfil de autenticação removido !", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    },
                    0: function () {
                        _AppUtil.HTTP0();
                    }
                }
            });
        }
    }

    static setDeviceAuthenticationProfile = (obj) => {
        return dispatch => {
            dispatch({ type: _action.SET_DEVICEAUTHPROFILE, data: obj });
        }
    }

    static saveDeviceAuthenticationProfile = (successCallback, dataJSON) => {
        return dispatch => {
            $.ajax({
                url: `${_AppUtil.apiURL}device-profile/save-authentication-profile`,
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify(dataJSON),
                statusCode: {
                    500: function (data) {
                        _AppUtil.HTTP500();
                    },
                    200: function (data) {
                        if (dataJSON.id === null || dataJSON.id === undefined) {
                            dispatch({ type: _action.ADD_DEVICEAUTHPROFILE, data });
                        } else {
                            dispatch({ type: _action.EDIT_DEVICEAUTHPROFILE, data });
                        }
                        dispatch({ type: _action.RESET_DEVICEAUTHPROFILE });
                        successCallback();
                        toast.info("Perfil de autenticação adicionado !", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    },
                    400: function (data) {
                        new ErrorValidatorHandler().publicaErros(data.responseJSON);
                        toast.warn("Não foi possível adicionar o perfil de autenticação, verifique os campos obrigatórios !", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: false
                        });
                    },
                    0: function (data) {
                        _AppUtil.HTTP0();
                    }
                }
            });
        }
    }

    ////////// COMMUNITY PROFILE
    //////////////
    static removeDeviceProfileCommunity = (successCallback, id) => {
        return dispatch => {
            $.ajax({
                url: `${_AppUtil.apiURL}device-profile/remove-community-profile`,
                method: 'GET',
                contentType: 'application/json',
                data: { id: id },
                statusCode: {
                    500: function (data) {
                        _AppUtil.HTTP500();
                    },
                    200: function (data) {
                        dispatch({ type: _action.REM_DEVICEPROFILECOMMUNITY, data: id });
                        dispatch({ type: _action.RESET_DEVICEPROFILECOMMUNITY });
                        successCallback();
                        toast.info("Comunidade removida !", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    },
                    0: function () {
                        _AppUtil.HTTP0();
                    }
                }
            });
        }
    }

    static setDeviceProfileCommunity = (obj) => {
        return dispatch => {
            dispatch({ type: _action.SET_DEVICEPROFILECOMMUNITY, data: obj });
        }
    }

    static fetchAllDeviceProfileCommunity = (successCallback) => {
        return dispatch => {
            $.ajax({
                url: `${_AppUtil.apiURL}device-profile/list-community-profile`,
                method: 'GET',
                dataType: 'json',
                statusCode: {
                    500: function (data) {
                        _AppUtil.HTTP500();
                    },
                    200: function (data) {
                        dispatch({ type: _action.LIST_DEVICEPROFILECOMMUNITY, data });
                        successCallback();
                    },
                    0: function () {
                        _AppUtil.HTTP0();
                    }
                }
            });
        }
    }

    static saveDeviceProfileCommunity = (successCallback, dataJSON) => {
        return dispatch => {
            $.ajax({
                url: `${_AppUtil.apiURL}device-profile/save-community`,
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify(dataJSON),
                statusCode: {
                    500: function (data) {
                        _AppUtil.HTTP500();
                    },
                    200: function (data) {
                        if (dataJSON.id === null || dataJSON.id === undefined) {
                            dispatch({ type: _action.ADD_DEVICEPROFILECOMMUNITY, data });
                        } else {
                            dispatch({ type: _action.EDIT_DEVICEPROFILECOMMUNITY, data });
                        }
                        dispatch({ type: _action.RESET_DEVICEPROFILECOMMUNITY });
                        successCallback();
                        toast.info("Comunidade adicionada !", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    },
                    400: function (data) {
                        new ErrorValidatorHandler().publicaErros(data.responseJSON);
                        toast.warn("Não foi possível adicionar a comunidade, verifique os campos obrigatórios !", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: false
                        });
                    },
                    0: function (data) {
                        _AppUtil.HTTP0();
                    }
                }
            });
        }
    }
}