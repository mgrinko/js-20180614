'use strict'

import HttpService from  '../../common/services/http-service.js';


const PhoneService = {
    getAll(callback) {
        HttpService._sendRequest('api/phones.json', {successCallback: callback});
    },

    get(phoneId, callback) {
        HttpService._sendRequest(`/api/phones/${phoneId}.json`, {successCallback: callback,});
    },


}

export default PhoneService;

