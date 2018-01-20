import { toast } from 'react-toastify';
import uuidv1 from 'uuid'

export const apiURL = 'http://localhost:8080/api/';

/**
 * 
 * @param {*} url 
 */

export function removeUUIDFromArray(array) {
    for (let obj of array) {
        delete obj.uuid;
    }
    return array;
}

export function parseIdFromUrl(url) {
    return (url.substring(url.lastIndexOf("/") + 1, url.length));
}

export function generateUUID() {
    return uuidv1();
}

export function HTTP500() {
    toast.error("Ocorreu um erro ao processar a requisição, tente novamente ou contate o adminsitrador do sistema !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: false
    });
}

export function HTTP0() {
    toast.error("Servidor de requisições inacessível, tente novamente ou contate o adminsitrador do sistema !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: false
    });
}

export function isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}