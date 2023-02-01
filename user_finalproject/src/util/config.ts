import axios from 'axios';
import { history } from '..';
export const DOMAIN = 'https://airbnbnew.cybersoft.edu.vn';
export const ACCESS_TOKEN = 'access_token';
export const USER_LOGIN = 'userLogin';
const TOKEN_CYBERSOFT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3MyIsIkhldEhhblN0cmluZyI6IjMwLzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NTQwNDgwMDAwMCIsIm5iZiI6MTY1OTg5MTYwMCwiZXhwIjoxNjg1NTUyNDAwfQ.-poI4CYh8bBsN-xbPHgcbNrVnKw1fA1r4IuZCUk0rmA';

export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});

// Cau hinh ham get set Storage hoac Cookie
export const { setStorage, setStorageJson, getStorageJson, getStore } = {
  setStorageJson: (name: string, data: any): void => {
    data = JSON.stringify(data);
    localStorage.setItem(name, data);
  },
  setStorage: (name: string, data: any): void => {
    localStorage.setItem(name, data);
  },
  getStorageJson: (name: string): any | undefined => {
    if (localStorage.getItem(name)) {
      const dataStore: string | undefined | null = localStorage.getItem(name);
      if (typeof dataStore == 'string') {
        const data = JSON.parse(dataStore);
        return data;
      }
      return undefined;
    }
    return; // undefined
  },
  getStore: (name: string): string | null | undefined => {
    if (localStorage.getItem(name)) {
      const data: string | null | undefined = localStorage.getItem(name);
      return data;
    }
    return;
  },
};

console.log('getStore(ACCESS_TOKEN)  :', getStore(ACCESS_TOKEN));
// Cau hinh tat ca request gui di
http.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
      TokenCybersoft: TOKEN_CYBERSOFT,
      Token: getStore(ACCESS_TOKEN),
    };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// Cau hinh tat ca ket qua tra ve

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response.status === 404) {
      // Chuyen huong trang ve trang chu
      history.push('/');
    }
    return Promise.reject(error);
  }
);
