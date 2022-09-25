import type { AxiosRequestConfig } from 'axios';
import type { AxiosRequestInterceptor } from './type';
import { useTokenStore } from '@/stores/token';
import { ref } from 'vue';
import { tokenApi } from '@/api/token';

export function BearerTokenInterceptor(): AxiosRequestInterceptor {
  return {
    onFulfilled: (config: AxiosRequestConfig) => {
      const store = useTokenStore();
      const token = store.getToken();
      if (token) {
        if (!config.headers) {
          config.headers = {};
        }
        console.log(22);
        config.headers.Authorization = `Bearer ${token}`;
      }
      return Promise.resolve(config);
    },
  };
}

type callback = (newToken: string) => void;

const isRefeshing = ref(false);
let requests: callback[] = [];

export function RefreshTokenInterceptor(abortController: AbortController): AxiosRequestInterceptor {
  return {
    onFulfilled: (config: AxiosRequestConfig) => {
      const { isTokenWillExpire, getRefreshToken, setToken, setExpireTime } = useTokenStore();
      if (isTokenWillExpire()) {
        if (!isRefeshing.value) {
          isRefeshing.value = true;

          const { execute, data } = tokenApi.refreshToken({ refreshToken: getRefreshToken() });
          console.log('refreshToken 1');
          execute()
            .then(() => {
              console.log('refreshToken 2');
              setToken(data.value?.result.token);
              setExpireTime(data.value?.result.expireTime);
              isRefeshing.value = false;
              return Promise.resolve(data.value?.result.token || '');
            })
            .then(
              (token) => {
                console.log('refreshToken 4');
                requests.forEach((cb: callback) => cb(token));
                // 执行完成后，清空队列
                requests = [];
              },
              () => {
                console.log('refreshToken 4');
                isRefeshing.value = false;
                abortController.abort();
                return config;
              },
            );
        }

        return new Promise((resolve) => {
          console.log('refreshToken 5');
          requests.push((newToken: string) => {
            console.log('refreshToken 6', newToken);
            if (!config.headers) {
              config.headers = {};
            }
            config.headers.Authorization = `Bearer ${newToken}`;
            resolve(config);
          });
        });
      }

      return config;
    },
  };
}
