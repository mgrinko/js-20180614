'use strict'

import HttpService from '../../common/services/http-service.js';

const PhoneService = {
  getAll(callback) {
    HttpService.sendRequest('phones.json', callback)
  },

  get(phoneId, callback) {
    // HttpService.sendRequest(`phones/${phoneId}.json`, callback)
    let promise = this._sendRequest(`phones/${phoneId}.json`);
    promise.then(callback)
  },

  _sendRequest(url) {
    let promise = {
      _successCallbacks: [],

      then(successCallback) {
        this._successCallbacks.push(successCallback);
      },

      _resolve(data) {
        this._successCallbacks.forEach(callback => {
          callback(data)
        });
      }
    };

    HttpService.sendRequest(url, (data) => {
      promise._resolve(data)
    })

    return promise
  }
};

export default PhoneService;









// function getAcademy (subdomain, successCallback, errorCallback) {}
// function getUser (token, successCallback) {}
// function getCourse (courseId, successCallback) {}
// function getUserCourse (userId, courseId, successCallback) {}
//
//
// getUser('qweqweqweqwe', (user) => {
//   if (!academy) {
//     return
//   }
//
// }, () => {})
//
//
// getAcademy('academy', (academy) => {
//   if (!user) {
//     return
//   }
//
//   if (!user.hasAccessTo(academy) ) {
//     // redirect to error page
//   }
//
//   getCourse(123, (course) => {
//     getUserCourse(user.id, course.id, (progress) => {
//
//       getTopic(progress.lastTopicId, (topic) => {
//         renderTopic(topic)
//       }, () => {})
//     }, () => {})
//   }, () => {})
// }, () => {})
//
// getAcademy()
//   .then(academy => {
//
//     return getUser()
//   })
//   .then(user => {
//
//     return getCourse()
//   })
//   .then(course => {
//
//
//     return getUserCourse()
//   })
//   .catch(() => {})
//
//
// if (academy) {
//   return
// }
//
// let user = getuser()
// let user = getuser()
// let user = getuser()
// let user = getuser()
// let user = getuser()
