import axios from 'axios';

const JSONSERVER = 'http://localhost:3001';

export const ServerAxiosInstance = axios.create({
  baseURL: JSONSERVER,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json',
}});

ServerAxiosInstance.interceptors.response.use(
    (response) => {
        console.log(`Json Server Response: ${response.status} ${response.statusText}`);
        return response.data;
    });

ServerAxiosInstance.interceptors.request.use(
    (config) => {
        console.log(`Json Server Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    });

export default ServerAxiosInstance;
