'use strict'

import HttpService from '../../common/services/http-service.js';


class MyPromise {
  constructor (behaviorFunction) {
    this._result = null;
    this._status = 'pending';
    this._successCallbacks = [];
    this._errorCallbacks = [];

    behaviorFunction(this._resolve.bind(this), this._reject.bind(this))
  }

  then(successCallback, errorCallback) {
    if (this._status === 'fulfilled') {
      successCallback(this._result);
    } else if (this._status === 'rejected') {
      errorCallback(this._result)
    } else {
      this._successCallbacks.push(successCallback);
      this._errorCallbacks.push(errorCallback);
    }
  }

  catch(errorCallback) {
    if (this._status === 'rejected') {
      errorCallback(this._result)
    } else {
      this._errorCallbacks.push(errorCallback)
    }
  }

  _resolve(data) {
    this._status = 'fulfilled';
    this._result = data;

    this._successCallbacks.forEach(callback => {
      callback(data)
    });
  }

  _reject(error) {
    this._status = 'rejected';
    this._result = error;

    this._errorCallbacks.forEach(callback => {
      callback(error)
    });
  }
}

const PhoneService = {
  getAll(callback) {
    HttpService.sendRequest('phones.json', callback)
  },

  get(phoneId, callback) {
    // HttpService.sendRequest(`phones/${phoneId}.json`, callback)
    let promise = this._sendRequest(`123phones/${phoneId}.json`);

    promise.then(callback, (error) => { console.log(error) });
    promise.catch(alert);

    setTimeout(() => {
      promise.then((result) => {
        console.log('!!!!!')
      });
    }, 1000)
  },

  _sendRequest(url) {
    return new MyPromise((resolve, reject) => {
      HttpService.sendRequest(url, resolve, reject);
    });
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
