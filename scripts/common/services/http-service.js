const API_URL = 'https://for93t.github.io/js-20180614-by-for93t/api/';
// const API_URL = 'http://localhost:3000/api/';

const HttpService = {
  sendRequest(url, successCallback, errorCallback) {
    let method = 'GET';
    let xhr = new XMLHttpRequest();

    xhr.open(method, API_URL + url, true);
    xhr.send();

    xhr.onload = () => {
      let responseData = JSON.parse(xhr.responseText);

      successCallback(responseData);
    };

    xhr.onerror = () => {
      errorCallback(new Error(xhr.status + ': ' + xhr.statusText));
    }
  }
};

export default HttpService;
