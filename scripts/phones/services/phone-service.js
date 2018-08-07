'use strict'

import HttpService from '../../common/services/http-service.js';

const PhoneService = {
  getAll(callback, searchQuery, sortBy) {
    HttpService.sendRequest(`phones.json?searchQuery=${ searchQuery }&sort=${ sortBy }`, callback);
  },

  get(phoneId, callback) {
    HttpService.sendRequest(`phones/${phoneId}.json`, callback);
  },
};

export default PhoneService;
