import $ from 'jquery';
import { toast } from 'react-toastify';

import * as _AppUtil from '../../_util/AppUtil';
import * as _action from '../../_reducer/_action';
import ErrorValidatorHandler from '../../_util/ErrorValidatorHandler';

export default class ConfigurationContainer {
    static setSifCollector = (obj) => {
        return dispatch => {
            dispatch({ type: _action.SET_SIFCOLLECTOR, data: obj });
        }
    }

    static fetchAllSifCollector = () => {
        return dispatch => {
            $.ajax({
                url: `${_AppUtil.apiURL}configuration/list-all`,
                method: 'GET',
                dataType: 'json',
                statusCode: {
                    500: function (data) {
                        _AppUtil.HTTP500();
                    },
                    200: function (data) {
                        dispatch({ type: _action.LIST_SIFCOLLECTOR, data });
                    },
                    0: function () {
                        _AppUtil.HTTP0();
                    }
                }
            });
        }
    }

    static saveCollector = (dataJSON) => {
        return dispatch => {
            $.ajax({
                url: `${_AppUtil.apiURL}configuration/save-collector`,
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
                            dispatch({ type: _action.ADD_SIFCOLLECTOR, data });
                        } else {
                            dispatch({ type: _action.EDIT_SIFCOLLECTOR, data });
                        }
                        dispatch({ type: _action.RESET_SIFCOLLECTOR });
                        toast.info("Coletor adicionado !", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    },
                    400: function (data) {
                        new ErrorValidatorHandler().publicaErros(data.responseJSON);
                        toast.warn("Não foi possível adicionar o coletor, verifique os campos obrigatórios !", {
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

    static fetchConfiguration = () => {
        return dispatch => {
            $.ajax({
                url: `${_AppUtil.apiURL}configuration/get`,
                dataType: 'json',
                method: 'GET',
                statusCode: {
                    500: function (data) {
                        _AppUtil.HTTP500();
                    },
                    200: function (data) {
                        dispatch({ type: _action.LIST_CONFIGURATION, data });
                    },
                    0: function () {
                        _AppUtil.HTTP0();
                    }
                }
            });
        }
    }

    static resetSifCollector = () => {
        return dispatch => {
            dispatch({ type: _action.RESET_SIFCOLLECTOR });
        }
    }
}