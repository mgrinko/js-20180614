"use strict"

const  API_URL = 'https://yurlovr.github.io/js-20180614/api/';

const HttpService = {

   _sendRequest(url, successCallback, errorCallback)
    {
        let method = 'GET';

    let xhr = new XMLHttpRequest();

    xhr.open(method, API_URL + url, true);
    xhr.send();

    xhr.onload = () => {

        let responseData = JSON.parse(xhr.responseText);
        successCallback(responseData);
    };
    xhr.onerror = () => {
        errorCallback(new Error(xhr.status + ':' + xhr.statusText));
    };

}
    };

export default HttpService;