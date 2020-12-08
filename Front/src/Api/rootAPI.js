import axios from 'axios';

import displayError from '../Utils/Notify/DisplayError';

import {_rootPath} from '../Config';

import store from '../Redux/Store';

export {displayError, _rootPath};

const _defaultOptions = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export default function rootAPI(options = {}) {

    const _root = axios.create(_defaultOptions);

    let defaultOptions = {
        withToken: true,
        displayError: false,
    };

    defaultOptions = {
        ...defaultOptions,
        ...options,
    };

    _root.interceptors.request.use(
        async config => {
            const state = store.getState();
            const token = state?.user?.authToken ?? "";

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        error => {
            return Promise.reject(error);
        },
    );

    _root.interceptors.response.use(undefined, (error) => {
        if (defaultOptions.displayError) {
            displayError(error);
        }
        return Promise.reject(error);
    });

    return _root;
}
