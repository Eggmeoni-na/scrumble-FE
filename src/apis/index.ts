import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? '' : import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true,
  },
});

export * from './auth';
export * from './squad';
export * from './todo';
