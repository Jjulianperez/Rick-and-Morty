import axios from 'axios';

const RICKMORTY_BASE_URL = 'https://rickandmortyapi.com/api';

export const axiosInstance = axios.create({
  baseURL: RICKMORTY_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json',
}});

axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`Rick and Morty Response: ${response.status} ${response.statusText}`);
        return response.data;
    });

axiosInstance.interceptors.request.use(
    (config) => {
        console.log(`Rick and Morty Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    });

export default axiosInstance;
