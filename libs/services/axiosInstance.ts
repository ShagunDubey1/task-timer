import axios from 'axios';
import { deleteToken, getToken, saveToken } from '../utils/secureStore';
import literals from '@/constants/literals';
import apis from '@/apis';
import { router } from 'expo-router';

const axiosConfig = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL!,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosConfig.interceptors.request.use(
  async (config) => {
    const accessToken = await getToken(literals.SecureStorageKeys.ACCESS_TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await getToken(
        literals.SecureStorageKeys.REFRESH_TOKEN
      );
      if (refreshToken) {
        try {
          const response = await axios.post(apis.refresh, {
            refreshToken,
          });

          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.accessToken;

          await saveToken(
            literals.SecureStorageKeys.ACCESS_TOKEN,
            newAccessToken
          );
          await saveToken(
            literals.SecureStorageKeys.REFRESH_TOKEN,
            newRefreshToken
          );

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (error) {
          console.log('Token refresh failed:', error);
          await deleteToken(literals.SecureStorageKeys.ACCESS_TOKEN);
          await deleteToken(literals.SecureStorageKeys.REFRESH_TOKEN);
          router.replace('/login');
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
