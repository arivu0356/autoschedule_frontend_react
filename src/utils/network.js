import axios from 'axios';

const setHeaders = (isAuthRequired) => {
    return new Promise((resolve, reject) => {
        if (isAuthRequired) {
            var user = localStorage.getItem('AuthUser');
            console.log({user})
            if (user) {
                resolve({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(user).token}`
                });
            }
        } else {
            resolve({
                'Content-Type': 'application/json'
            });
        }
    });
};

const logError = (error) => {
    if (error['response']) {
    } else {
    }
};

class NetWorkManager {
    static get(url, isAuthRequired = true, params = {}, hmac) {
        let config = {};
        return setHeaders(isAuthRequired)
            .then((headers) => {
                config['headers'] = headers;
                config['params'] = new URLSearchParams(params);
                return axios.get(url, config);
            })
            .catch((err) => {
                if (err.response && (err.response.status == 401 || err.response.status == 403)) {
                    window.location.assign(window.location.origin + '/');
                }
                logError(err);
                throw err;
            });
    }

    static post(url, data, isAuthRequired = true, params = {}) {
        let config = {};
        return setHeaders(isAuthRequired)
            .then((headers) => {
                config['headers'] = headers;
                config['params'] = params;
                return axios.post(url, data, config);
            })
            .catch((err) => {
                if (err.response && (err.response.status == 401 || err.response.status == 403)) {
                    window.location.assign(window.location.origin + '/');
                }
                logError(err);
                return err;
            });
    }

    static put(url, data, isAuthRequired = true, params = {}) {
        let config = {};
        return setHeaders(isAuthRequired)
            .then((headers) => {
                config['headers'] = headers;
                config['params'] = params;
                return axios.put(url, data, config);
            })
            .catch((err) => {
                if (err.response && (err.response.status == 401 || err.response.status == 403)) {
                    window.location.assign(window.location.origin + '/');
                }
                logError(err);
                throw err;
            });
    }

    static delete(url, isAuthRequired = true, params = {}) {
        let config = {};
        return setHeaders(isAuthRequired)
            .then((headers) => {
                config['headers'] = headers;
                config['params'] = params;
                return axios.delete(url, config);
            })
            .catch((err) => {
                if (err.response && err.response.status == 401) {
                    window.location.assign(window.location.origin + '/');
                }
                logError(err);
                throw err;
            });
    }
}

export default NetWorkManager;
