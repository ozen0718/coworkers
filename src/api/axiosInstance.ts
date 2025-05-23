import axios from 'axios';
import { useAuthStore } from '@/stores/useAuthStore';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: accessToken을 Authorization 헤더에 추가
axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
