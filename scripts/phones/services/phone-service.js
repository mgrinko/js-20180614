'use strict'

import HttpService from '../../common/services/http-service.js';


class MyPromise {
  constructor (behaviorFunction) {
    this._result = null;
    this._status = 'pending';
    this._successCallbacks = [];

    behaviorFunction(this._resolve.bind(this))
  }

  then(successCallback) {
    if (this._status === 'fulfilled') {
      successCallback(this._result);
    } else {
      this._successCallbacks.push(successCallback);
    }
  }

  _resolve(data) {
    this._status = 'fulfilled';
    this._result = data;

    this._successCallbacks.forEach(callback => {
      callback(data)
    });
  }
}

const PhoneService = {
  getAll(callback) {
    HttpService.sendRequest('phones.json', callback)
  },

  get(phoneId, callback) {
    // HttpService.sendRequest(`phones/${phoneId}.json`, callback)
    let promise = this._sendRequest(`phones/${phoneId}.json`);
    promise.then(callback);

    promise.then((result) => {
      console.log(result)
    });

    setTimeout(() => {
      promise.then((result) => {
        console.log('!!!!!')
      });
    }, 1000)
  },

  _sendRequest(url) {
    let promise = new MyPromise(
      (resolve) => {
        HttpService.sendRequest(url, (data) => {
          resolve(data)
        });
      }
    );



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
