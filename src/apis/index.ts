import axios, { AxiosError, AxiosResponse } from 'axios';

export const baseURL = import.meta.env.MODE === 'development' ? '' : import.meta.env.VITE_API_URL;

export const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true,
  },
  withCredentials: true,
});

const responseInterceptor = (response: AxiosResponse): AxiosResponse => response;
const errorHandler = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

instance.interceptors.response.use(responseInterceptor, errorHandler);

export * from './auth';
export * from './squad';
export * from './todo';
