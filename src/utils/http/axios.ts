import axios, { AxiosError } from 'axios';

import {
  BearerTokenInterceptor,
  refreshAuthLogic,
  setTokenHeader,
} from '@/utils/http/interceptors/token';
import type {
  AxiosRequestInterceptor,
  AxiosResponseInterceptor,
} from '@/utils/http/interceptors/type';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useTokenStore } from '@/stores/token';
import type { APIResult } from '@/utils/http/type';
import { LastStepResponseInterceptor } from '@/utils/http/interceptors';

const controller = new AbortController();

// request 拦截器列表 ,注意是先进后出
const requestInterceptors: AxiosRequestInterceptor[] = [BearerTokenInterceptor()];

// response 拦截器列表 ,注意是先进先出
const responseInterceptors: AxiosResponseInterceptor[] = [LastStepResponseInterceptor()];

const instance = axios.create({
  signal: controller.signal,
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

requestInterceptors.forEach((interceptor) => {
  instance.interceptors.request.use(interceptor.onFulfilled, interceptor.onRejected);
});

// token 刷新拦截器
createAuthRefreshInterceptor(instance, refreshAuthLogic, {
  pauseInstanceWhileRefreshing: true,
  retryInstance: instance,
  onRetry: (requestConfig) => {
    console.log('onRetry');
    const { token } = useTokenStore();
    return Promise.resolve(setTokenHeader(requestConfig, token));
  },

  shouldRefresh: (error: AxiosError<APIResult>): boolean => {
    const { isTokenWillExpire } = useTokenStore();
    if (isTokenWillExpire) {
      return true;
    }
    // 根据自己业务修改
    return error?.response?.data.code === 100358;
  },
  interceptNetworkError: true,
});

responseInterceptors.forEach((interceptor) => {
  instance.interceptors.response.use(interceptor.onFulfilled, interceptor.onRejected);
});

export default instance;
