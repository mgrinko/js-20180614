'use strict';

import HttpService from '../../common/services/http-service.js';

const PhoneService = {
    getAll(callback) {
        HttpService.sendRequest('phones.json', callback);
    },

    get(phoneId, callback) {
        // HttpService.sendRequest(`phones/${phoneId}.json`, callback);
        let promise = this._sendRequest(`phones/${phoneId}.json`);
        promise.then(callback);
    },

    _sendRequest(url) {
        let promise = {
            _successCallBacks: [],

            then(successCallback) {
                this._successCallBacks.push(successCallback);
            },

            _resolve(data) {
                this._successCallBacks.forEach(callback => {
                    callback(data);
                })
            },
        };

        HttpService.sendRequest(url, data => {
            promise._resolve(data);
        });

        return promise;
    }
};

export default PhoneService;
