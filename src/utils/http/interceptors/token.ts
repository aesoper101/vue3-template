import type { AxiosRequestConfig } from 'axios';
import type { AxiosRequestInterceptor } from './type';
import { useTokenStore } from '@/stores/token';
import { loginApi } from '@/api/login';
import { until } from '@vueuse/core';
import type { AxiosError } from 'axios';

export function BearerTokenInterceptor(): AxiosRequestInterceptor {
  return {
    onFulfilled: (config: AxiosRequestConfig) => {
      const { token } = useTokenStore();
      return Promise.resolve(setTokenHeader(config, token));
    },
  };
}

export function setTokenHeader(config: AxiosRequestConfig, token: string) {
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

export function refreshAuthLogic(failedRequest: AxiosError) {
  console.log('======refreshAuthLogic======');
  return new Promise((resolve, reject) => {
    const { refreshToken, setToken, setExpireTime, clearToken } = useTokenStore();
    const { isFinished, data, error } = loginApi.refreshToken({
      refreshToken: refreshToken,
    });

    until(isFinished)
      .toBe(true)
      .then(() => {
        console.log('======refreshAuthLogic isFinished======');
        if (!error) {
          clearToken();
          reject(error);
          return;
        }
        const token = data.value?.result.token;
        const expireTime = data.value?.result.expireTime;
        setToken(token);
        setExpireTime(expireTime);

        if (failedRequest.response) {
          if (failedRequest.response.config) {
            if (!failedRequest.response.config.headers) {
              failedRequest.response.config.headers = {};
            }
            failedRequest.response.config.headers['Authorization'] = 'Bearer ' + token;
          }
        }

        resolve(null);
      });
  });
}
