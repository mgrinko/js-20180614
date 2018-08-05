'use strict'

const PhoneService = {
    getAll(callback) {
        this._sendRequest('api/phones.json', {successCallback: callback});
    },

    get(phoneId, callback) {
        this._sendRequest(`/api/phones/${phoneId}.json`, {successCallback: callback,});
    },

    _sendRequest(url, {
        method = 'GET',
        successCallback = () => {
        },
        errorCallback = console.error,
    } = {}) {

        let xhr = new XMLHttpRequest();

        xhr.open(method, url, true);
        xhr.send();

        xhr.onload = () => {

            let responseData = JSON.parse(xhr.responseText);
            successCallback(responseData);
        };
        xhr.onerror = () => {
            errorCallback(new Error(xhr.status + ':' + xhr.statusText));
        };

    }
}

export default PhoneService;

