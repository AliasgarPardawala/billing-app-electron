export default class ApiClient {
    httpClient;
    apiUrl = "http://localhost:3000"

    constructor(httpClient) {
        this.httpClient = httpClient
    }

    get = (url, body, headers) => {
        return this._promiseErrorHandler(
            this.httpClient.get(
                this.apiUrl + "/" + url,
                headers ? headers : {},
                body
            )
        );
    };

    post = (url, body) => {
        return this._promiseErrorHandler(
            this.httpClient.post(
                this.apiUrl + "/" + url,
                {},
                body
            )
        );
    };

    patch = (url, body) => {
        return this._promiseErrorHandler(
            this.httpClient.patch(
                this.apiUrl + "/" + url,
                {},
                body
            )
        );
    };

    put = (url, body) => {
        return this._promiseErrorHandler(
            this.httpClient.put(
                this.apiUrl + "/" + url,
                {},
                body
            )
        );
    };

    delete = (url, queryParams) => {
        return this._promiseErrorHandler(
            this.httpClient.delete(
                this.apiUrl + "/" + url,
                {},
                queryParams
            )
        );
    };

    postWithParams = (url, body, queryParams = {}) => {
        return this._promiseErrorHandler(
            this.httpClient.postWithParams(
                this.apiUrl + "/" + url,
                {},
                body,
                queryParams
            )
        );
    };

    _promiseErrorHandler = (request) => {
        return new Promise((resolve, reject) => request.then(resolve).catch(error => {
            reject(error);
        }));
    };
}
