// const API_URL = 'https://mgrinko.github.io/js-20180614/api/'
const API_URL = '/api/'

const HttpService = {
  sendRequest(url) {

    return new Promise((resolve, reject) => {
      let method = 'GET';
      let xhr = new XMLHttpRequest();

      xhr.open(method, API_URL + url, true);
      xhr.send();

      xhr.onload = () => {
        if (xhr.status !== 200) {
          reject(new Error(xhr.status + ': ' + xhr.statusText));

          return;
        }

        let responseData = JSON.parse(xhr.responseText);

        resolve(responseData);
      };

      xhr.onerror = () => {
        reject(new Error(xhr.status + ': ' + xhr.statusText));
      }
    })
  }
}

export default HttpService;


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
