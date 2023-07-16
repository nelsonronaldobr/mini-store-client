import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const devStoreApi = axios.create({
    baseURL: VITE_API_URL
});

// TODO configurar interceptores
devStoreApi.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const headers: AxiosRequestHeaders = Object.assign({}, config.headers, {
            ...config.headers,
            Authorization: `Bearer ${localStorage.getItem('tokenSession')}`
        });
        config.headers = headers;
        return config;
    }
);

export { devStoreApi };
