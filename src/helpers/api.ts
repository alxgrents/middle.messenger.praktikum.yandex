type HTTPMethod = "get" | "post" | "put" | "patch" | "delete";
type RequestData = Record<string, any>;
type RequestHeaders = Record<string, any>;
type RequestOptions = {
    timeout?: number,
    data?: RequestData,
    headers?: RequestHeaders,
}
type AbstractMethodRequestOptions = RequestOptions & {
    method: HTTPMethod,
}

class Api {
    private static _instance: Api;
    static getInstance () {
        !Api._instance && (Api._instance = new Api());

        return this._instance;
    }

    // Пустой приватный конструктор, чтобы получить экземпляр можно было только через статичный геттер
    private constructor () {};

    public get (url: string, options: RequestOptions = {}): Promise<any> {
        return this._request(url, {...options, method: "get"});
    }

    public post (url: string, options: RequestOptions = {}) {
        return this._request(url, {...options, method: "post"});
    }

    public delete (url: string, options: RequestOptions = {}) {
        return this._request(url, {...options, method: "delete"});
    }

    public put (url: string, options: RequestOptions = {}) {
        return this._request(url, {...options, method: "put"});
    }

    public patch (url: string, options: RequestOptions = {}) {
        return this._request(url, {...options, method: "patch"});
    }

    private _request (url: string, options: AbstractMethodRequestOptions) {
        return new Promise((resolve, reject) => {
            url = Api.setupUrl(url, options.method, options.data);

            const xhr = new XMLHttpRequest();

            xhr.open(options.method, url );
            Api.setupHeaders(xhr, options.headers);

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    xhr.status === 200 ? resolve(xhr) : reject();
                }
            }

            if (options.timeout !== undefined) {
                xhr.ontimeout = reject;
                xhr.timeout = options.timeout;
            }

            Api.send(xhr, options);

        });
    }

    private static send (xhr: XMLHttpRequest, options: AbstractMethodRequestOptions) {
        if (options.method !== "get" && 'data' in options) {
            xhr.send(JSON.stringify(options.data));
        }
        else {
            xhr.send();
        }
    }

    private static setupUrl (url: string, method: HTTPMethod, data?: RequestData) {
        if (method === "get" && typeof data === 'object') {
            return url + '?' + Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&');
        }

        return url;
    }

    private static setupHeaders (xhr: XMLHttpRequest, headers?: RequestHeaders): void {
        if (typeof headers !== 'object') {
            return;
        }

        Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
        });
    }
}

export default Api;