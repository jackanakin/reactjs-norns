import $ from 'jquery';
import { toast } from 'react-toastify';

import * as _AppUtil from '../../_util/AppUtil';
import * as _action from '../../_reducer/_action';
import ErrorValidatorHandler from '../../_util/ErrorValidatorHandler';

export default class DeviceContainer {
    static fetchDevice = (id) => {
        return dispatch => {
            $.ajax({
                url: `${_AppUtil.apiURL}device/getById`,
                dataType: 'json',
                method: 'GET',
                data: { id: id },
                statusCode: {
                    500: function (data) {
                        _AppUtil.HTTP500();
                    },
                    400: function (data) {
                        toast.warn("Dispositivo não encontrado !", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: false
                        });
                    },
                    200: function (data) {
                        dispatch({ type: _action.SET_DEVICE, data });
                    },
                    0: function () {
                        _AppUtil.HTTP0();
                    }
                }
            });
        }
    }

    static fetchDevicePage = (size, page) => {
        return dispatch => {
            $.ajax({
                url: `${_AppUtil.apiURL}device/page`,
                method: 'GET',
                dataType: 'json',
                data: { size: size, page: page - 1 },
                statusCode: {
                    500: function (data) {
                        _AppUtil.HTTP500();
                    },
                    200: function (data) {
                        dispatch({ type: _action.PAGE_DEVICE, data });
                    },
                    0: function () {
                        _AppUtil.HTTP0();
                    }
                }
            });
        }
    }

    static saveDevice = (dataJSON) => {
        return dispatch => {
            $.ajax({
                url: `${_AppUtil.apiURL}device/save`,
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST',
                data: dataJSON,
                statusCode: {
                    500: function (data) {
                        _AppUtil.HTTP500();
                    },
                    200: function (data) {
                        dispatch({ type: _action.RESET_DEVICE });
                        dispatch({ type: _action.EDIT_DEVICE, data });
                        toast.info("Dispositivo adicionado !", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    },
                    400: function (data) {
                        new ErrorValidatorHandler().publicaErros(data.responseJSON);
                        toast.warn("Não foi possível adicionar o dispositivo, verifique os campos obrigatórios !", {
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

    static fetchAllSnmp = () => {
        return dispatch => {
            $.ajax({
                url: `${_AppUtil.apiURL}enumerated/list/snmp`,
                dataType: 'json',
                statusCode: {
                    500: function (data) {
                        _AppUtil.HTTP500();
                    },
                    200: function (data) {
                        dispatch({ type: _action.LIST_SNMP, data });
                    },
                    0: function () {
                        _AppUtil.HTTP0();
                    }
                }
            });
        }
    }

    static fetchAllInterval = () => {
        return dispatch => {
            $.ajax({
                url: `${_AppUtil.apiURL}enumerated/list/interval`,
                dataType: 'json',
                statusCode: {
                    500: function (data) {
                        _AppUtil.HTTP500();
                    },
                    200: function (data) {
                        dispatch({ type: _action.LIST_INTERVAL, data });
                    },
                    0: function () {
                        _AppUtil.HTTP0();
                    }
                }
            });
        }
    }

    static addSensor = (dataJSON) => {
        return dispatch => {
            $.ajax({
                url: `${_AppUtil.apiURL}device/create-sensor`,
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST',
                data: dataJSON,
                statusCode: {
                    500: function (data) {
                        _AppUtil.HTTP500();
                    },
                    200: function (data) {
                        if (data.uuid === null) {
                            dispatch({ type: _action.ADD_SENSOR, data });
                        } else {
                            dispatch({ type: _action.EDIT_SENSOR, data });
                        }
                        dispatch({ type: _action.RESET_SENSOR });
                        toast.info("Sensor adicionado !", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    },
                    400: function (data) {
                        new ErrorValidatorHandler().publicaErros(data.responseJSON);
                        toast.warn("Não foi possível adicionar o sensor, verifique os campos obrigatórios !", {
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

    static resetDevice = () => {
        return dispatch => {
            dispatch({ type: _action.RESET_DEVICE });
        }
    }

    static resetSensor = () => {
        return dispatch => {
            dispatch({ type: _action.RESET_SENSOR });
        }
    }

    static setSensor = (uuid) => {
        return dispatch => {
            dispatch({ type: _action.SET_SENSOR, data: uuid });
        }
    }

    static removeSensor = (uuid) => {
        return dispatch => {
            dispatch({ type: _action.REM_SENSOR, data: uuid });
            toast.info("Sensor removido !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
}