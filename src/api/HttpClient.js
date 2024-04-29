export default class HttpClient {

    getHeaders = (headers) => {
        const requiredHeaders = {
            "Content-Type": "application/json; charset=utf-8"
        };
        return {...requiredHeaders, ...headers};
    }

    fetchData = (
        url,
        method,
        headers,
        body,
    ) => {

        return fetch(url, {
            method: method || "GET",
            headers: this.getHeaders(headers),
            body: body !== undefined ? JSON.stringify(body) : null,
        }).then(this.errorHandler);
    };

    get = (url, headers, queryParams = {}) => {
        const joiner = url.indexOf('?') > 0 ? '&' : '?';

        return this.fetchData(`${url}${joiner}${this.paramsToQueryString(queryParams)}`, "GET", headers);
    };

    post = (url, headers, body) => {
        return this.fetchData(url, "POST", headers, body);
    };

    patch = (url, headers, body) => {
        return this.fetchData(url, "PATCH", headers, body);
    };

    put = (url, headers, body) => {
        return this.fetchData(url, "PUT", headers, body);
    };

    delete = (url, headers, queryParams = {}) => {
        const joiner = url.indexOf('?') > 0 ? '&' : '?';

        return this.fetchData(`${url}${joiner}${this.paramsToQueryString(queryParams)}`, "DELETE", headers);
    };

    errorHandler = async (res) => {
        if (!res) {
            throw new Error("No Response");
        }
        if (res.ok) {
            return res.json();
        } else {
            const errorMessage = `Api error ${res.status}`;
            switch (res.status) {
                case 400:
                    throw new Error(errorMessage);
                case 401:
                    const unAuthorisedError = await res.json();
                    throw new Error(unAuthorisedError.message ? unAuthorisedError.message : "", {});
                case 403:
                    throw new Error(errorMessage);
                case 404:
                    throw new Error(errorMessage);
                case 409:
                    throw new Error("Conflict", res);
                case 422:
                    const response = await res.json();
                    throw new Error(response?.message, response.errors || {});
                case 500:
                    const errorResponse = await res.json();
                    throw new Error(errorResponse.message ? errorResponse.message : errorMessage);
                case 502:
                    throw new Error(errorMessage, res);
                default:
                    throw new Error(errorMessage);
            }
        }
    };

    /**
     * converts params to query string
     *
     * @param json
     */
    paramsToQueryString = (json) => {
        return Object.keys(json)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(json[key]))
            .join('&');
    };
}
