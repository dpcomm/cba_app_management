import axios from 'axios';
import { DOMAIN } from './domain';
import { requestRefresh } from '.';

const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? DOMAIN.local : DOMAIN.main,
  timeout: 1000,
});

request.interceptors.request.use(async (config) => {
  const accessToken = await localStorage.getItem('access_token');
  if (!accessToken) {
    config.headers.Authorization = null;
    return config;
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const errorStatus = [500, 501, 502, 503];
    if (errorStatus.includes(error.response.status)) {
      window.location.href = '/management/maintenance';
    }
    if (error.response.data.message === 'jwt expired') {
      try {
        const beforeAccessToken: string | null = await localStorage.getItem('access_token');
        const beforeRefreshToken: string | null = await localStorage.getItem('refresh_token');
        if (!beforeRefreshToken) {
          await localStorage.removeItem('access_token');
          alert('로그인이 만료되었습니다. 다시 로그인 해주세요.');
          window.location.href = '/management/login';
          return;
        }
        const data = await requestRefresh(beforeAccessToken, beforeRefreshToken);
        if (data) {
          await localStorage.removeItem('access_token');
          await localStorage.setItem('access_token', data.data.accessToken);
          const newConfig = { ...error.config };
          newConfig.headers.Authorization = `Bearer: ${data.data.accessToken}`;
          return axios(newConfig);
        }
      } catch (error) {
        await localStorage.removeItem('access_token');
        await localStorage.removeItem('refresh_token');
        alert('자동 로그인이 만료되었습니다. 다시 로그인 해주세요.');
        window.location.href = '/management/login';
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default request;
