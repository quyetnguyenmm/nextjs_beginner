import { LoginPayload } from '@/models/index';
import axiosClient from './axios-client';

export const authApi = {
  login: (payload: LoginPayload) => axiosClient.post('/login', payload),

  logout: () => axiosClient.post('/logout'),

  getProfile: () => axiosClient.get('/profile'),
};
