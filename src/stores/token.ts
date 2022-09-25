import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import {
  REFRESH_TOKEN_STORE_KEY,
  TOKEN_EXPIRES_TIME_STORE_KEY,
  TOKEN_STORE_KEY,
} from '@/constants';

export const useTokenStore = defineStore('token', () => {
  const tokenStore = useStorage(TOKEN_STORE_KEY, '', localStorage);
  const refreshTokenStore = useStorage(REFRESH_TOKEN_STORE_KEY, '', localStorage);
  const expireTimeStore = useStorage(TOKEN_EXPIRES_TIME_STORE_KEY, 0, localStorage);

  const setToken = (token?: string) => {
    tokenStore.value = token;
  };

  const getToken = () => {
    return tokenStore.value;
  };

  const isTokenWillExpire = () => {
    if (tokenStore.value && expireTimeStore.value) {
      const nowTime = parseInt(String(new Date().getTime() / 1000));
      // 如果超过60秒重新获取token
      return expireTimeStore.value / 1000 - nowTime < 60;
    }
    return false;
  };

  const setRefreshToken = (refreshToken?: string) => {
    refreshTokenStore.value = refreshToken;
  };

  const getRefreshToken = () => {
    return refreshTokenStore.value;
  };

  const setExpireTime = (expire?: number) => {
    expireTimeStore.value = expire;
  };

  return {
    setToken,
    getToken,
    isTokenWillExpire,
    setRefreshToken,
    getRefreshToken,
    setExpireTime,
    token: tokenStore,
  };
});
