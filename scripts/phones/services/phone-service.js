'use strict'

import HttpService from  '../../common/services/http-service.js';


const PhoneService = {
    getAll(callback) {
        HttpService._sendRequest('phones.json',  callback)
    },

    get(phoneId, callback) {
        HttpService._sendRequest(`phones/${phoneId}.json`,  callback)
    },


};

export default PhoneService;

