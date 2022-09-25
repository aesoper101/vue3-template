import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import {
  REFRESH_TOKEN_STORE_KEY,
  TOKEN_EXPIRES_TIME_STORE_KEY,
  TOKEN_STORE_KEY,
} from '@/constants';
import { computed } from 'vue';

export const useTokenStore = defineStore('token', () => {
  const tokenStore = useStorage(TOKEN_STORE_KEY, '', localStorage);
  const refreshTokenStore = useStorage(REFRESH_TOKEN_STORE_KEY, '', localStorage);
  const expireTimeStore = useStorage(TOKEN_EXPIRES_TIME_STORE_KEY, 0, localStorage);

  const setToken = (token?: string) => {
    tokenStore.value = token;
  };

  const token = computed(() => {
    return tokenStore.value;
  });

  const isLogin = computed(() => {
    if (tokenStore.value && expireTimeStore.value) {
      const nowTime = parseInt(String(new Date().getTime() / 1000));
      // 如果超过60秒重新获取token
      return expireTimeStore.value / 1000 - nowTime > 0;
    }
    return false;
  });

  const isTokenWillExpire = computed(() => {
    if (tokenStore.value && expireTimeStore.value) {
      const nowTime = parseInt(String(new Date().getTime() / 1000));
      // 如果超过60秒重新获取token
      const subTime = expireTimeStore.value / 1000 - nowTime;
      return subTime < 60 && subTime > 0;
    }
    return false;
  });

  const setRefreshToken = (refreshToken?: string) => {
    refreshTokenStore.value = refreshToken;
  };

  const refreshToken = computed(() => {
    return refreshTokenStore.value;
  });

  const setExpireTime = (expire?: number) => {
    expireTimeStore.value = expire;
  };

  const clearToken = () => {
    tokenStore.value = null;
    refreshTokenStore.value = null;
    expireTimeStore.value = null;
  };

  return {
    setToken,
    token,
    isTokenWillExpire,
    isLogin,
    setRefreshToken,
    refreshToken,
    setExpireTime,
    clearToken,
  };
});
