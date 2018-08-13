'use strict'

import HttpService from '../../common/services/http-service.js';

const PhoneService = {
  getAll({ query = '', orderField = '' } = {}) {
    return HttpService.sendRequest('phones.json')
      .then(phones => {
        let filteredPhones = this._filter(phones, query)
        let sortedPhones = this._sort(filteredPhones, orderField)

        return sortedPhones
      })
  },

  get(phoneId) {
    return HttpService.sendRequest(`phones/${phoneId}.json`);
  },


  _filter(phones, query) {
    return phones
  },

  _sort(phones, orderField) {
    return phones
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
