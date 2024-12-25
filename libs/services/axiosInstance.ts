import axios from 'axios';
import { deleteToken, getToken, saveToken } from '../utils/secureStore';
import literals from '@/constants/literals';
import apis from '@/apis';
import { router } from 'expo-router';
import { useAuthStore } from '@/stores/useAuthStore';

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
    const { setIsAuthenticated } = useAuthStore();

    const originalRequest = error.config;
    console.log('3------->', error);
    if (error.response.status === 401) {
      console.log('2------->');

      originalRequest._retry = true;
      const refreshToken = await getToken(
        literals.SecureStorageKeys.REFRESH_TOKEN
      );
      console.log('1------->', refreshToken);

      if (refreshToken) {
        try {
          const response = await axios.post(apis.refresh, {
            refreshToken,
          });

          console.log(response.data);

          const newAccessToken = response.data.access_token;
          const newRefreshToken = response.data.refresh_token;

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
          setIsAuthenticated(false);

          router.replace('/login');
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
