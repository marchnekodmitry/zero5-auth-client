import axios from 'axios';

import { getAccessToken } from '@/utils/tokens';

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = accessToken;

    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response ? error.response.data.error : error),
);

export default instance;
