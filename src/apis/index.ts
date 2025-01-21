import axios from 'axios';

export const baseURL = import.meta.env.MODE === 'development' ? '' : import.meta.env.VITE_API_URL;

export const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true,
  },
  withCredentials: true,
});

export * from './auth';
export * from './squad';
export * from './todo';
