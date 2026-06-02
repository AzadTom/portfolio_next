import axios from 'axios';

export const apiBaseUrl = axios.create({
  baseURL: 'https://nestjsserver.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});