'use strict';

import HttpService from '../../common/services/http-service.js';

class MyPromise {
    constructor(behaviorFunction) {
        this._result = null;
        this._status = 'pending';
        this._successCallBacks = [];
        this._errorCallBacks = [];

        behaviorFunction(this._resolve.bind(this), this._reject.bind(this));
    }

    then(successCallback, errorCallback) {
        if (this._status === 'fulfilled') {
            successCallback(this._result);
        } else if (this._status === 'rejected') {
            errorCallback(this._result)
        } else {
            this._successCallBacks.push(successCallback);
            this._errorCallBacks.push(errorCallback);
        }
    };

    catch(errorCallback) {
        if (this._status === 'rejected') {
            errorCallback(this._result);
        } else {
            this._errorCallBacks.push(errorCallback);
        }
    };

    _resolve(data) {
        this._status = 'fulfilled';
        this._result = data;

        this._successCallBacks.forEach(callback => {
            callback(data);
        });
    };

    _reject(error) {
        this._status = 'rejected';
        this._result = error;

        this._errorCallBacks.forEach(callback => {
            callback(error);
        });
    };
}

const PhoneService = {
    getAll(callback) {
        HttpService.sendRequest('phones.json', callback);
    },

    get(phoneId, callback) {
        let promise = this._sendRequest(`123phones/${phoneId}.json`);
        promise.then(callback, error => console.log(error));
        promise.catch(error => console.log(error));
        
        promise.then(
            result => {
                console.log(result, 'result');
            },
            error => {
                console.log(error, 'error');
            },
        );

        setTimeout(() => {
           promise.then(
               () => {
                   console.log('!!!!!');
               },
               error => {
                   console.log(error, '!!!');
               },
           );
        }, 1000);
    },

    _sendRequest(url) {
        return new MyPromise((resolve, reject) => {
            HttpService.sendRequest(url, resolve, reject);
        });
    }
};

export default PhoneService;
