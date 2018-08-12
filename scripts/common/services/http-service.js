const API_URL = 'https://mgrinko.github.io/js-20180614/api/';

const HttpService = {
    sendRequest(url, successCallback, errorCallback) {
        let method = 'GET';
        let xhr = new XMLHttpRequest();

        xhr.open(method, API_URL + url, true);
        xhr.send();

        xhr.onerror = () => {
            errorCallback(new Error(xhr.status + ': 123' + xhr.statusText));
        };

        xhr.onload = () => {
            if (xhr.status !== 200) {
                errorCallback('Неправильный url');

                return;
            }

            let responseData = JSON.parse(xhr.responseText);

            successCallback(responseData);
        };
    }
};

export default HttpService;
