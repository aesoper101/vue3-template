import type { AxiosRequestConfig } from 'axios';
import type { AxiosRequestInterceptor } from './type';
import type { AxiosError } from 'axios';
import { useUserStore } from '@/stores';

export function BearerTokenInterceptor(): AxiosRequestInterceptor {
  return {
    onFulfilled: (config: AxiosRequestConfig) => {
      const { token } = useUserStore();
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
  return new Promise((resolve, reject) => {
    const { doRefreshToken } = useUserStore();
    doRefreshToken().then(
      (token: string) => {
        if (failedRequest.response) {
          if (failedRequest.response.config) {
            if (!failedRequest.response.config.headers) {
              failedRequest.response.config.headers = {};
            }
            failedRequest.response.config.headers['Authorization'] = 'Bearer ' + token;
          }
        }
        resolve(null);
      },
      (error) => reject(error),
    );
  });
}
