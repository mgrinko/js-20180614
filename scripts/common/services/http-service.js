"use strict"
const HttpService = {

   _sendRequest(url, successCallback, errorCallback)
    {
        let method = 'GET';

    let xhr = new XMLHttpRequest();

    xhr.open(method, url, true);
    xhr.send();

    xhr.onload = () => {

        let responseData = JSON.parse(xhr.responseText);
        console.log(responseData);
        successCallback(responseData);
    };
    xhr.onerror = () => {
        console.log('tut');
        errorCallback(new Error(xhr.status + ':' + xhr.statusText));
    };

}
    };

export default HttpService;