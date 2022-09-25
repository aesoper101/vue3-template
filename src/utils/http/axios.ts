// import type { AxiosResponse } from 'axios';
import axios, { AxiosError } from 'axios';
// import type { APIResult } from '@/utils/http/type';
// import { Message } from '@arco-design/web-vue';
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

const controller = new AbortController();

// request 拦截器列表 ,注意是先进后出
const requestInterceptors: AxiosRequestInterceptor[] = [BearerTokenInterceptor()];

// response 拦截器列表 ,注意是先进先出
const responseInterceptors: AxiosResponseInterceptor[] = [];

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  shouldRefresh: (error: AxiosError<APIResult>): boolean => {
    const { isTokenWillExpire } = useTokenStore();
    if (isTokenWillExpire) {
      return true;
    }
    return error?.response?.data.code === 100358;
  },
  interceptNetworkError: true,
});

//
responseInterceptors.forEach((interceptor) => {
  instance.interceptors.response.use(interceptor.onFulfilled, interceptor.onRejected);
});

// instance.interceptors.response.use(
//   (response: AxiosResponse<APIResult>) => {
//     console.log('====response======');
//     console.log(response);
//     const res = response.data;
//     if (res.code !== 0) {
//       // Message.error({
//       //   content: 'Error',
//       //   duration: 5 * 1000,
//       // });
//       // if (res.code === 5000) {
//       //   Modal.error({
//       //     title: 'Confirm logout',
//       //     content: 'You have been logged out, you can cancel to stay on this page, or log in again',
//       //     okText: 'Re-Login',
//       //     async onOk() {
//       //       // await userStore.logout();
//       //       window.location.reload();
//       //     },
//       //   });
//       // }
//       return Promise.reject(new Error(res?.message || 'Error'));
//     }
//     console.log(res.result);
//     // return new Promise((resolve) => resolve(res.result));
//     return Promise.resolve(res.result);
//   },
//   (error) => {
//     console.log('========response error=========');
//     console.log(error);
//     const response = (error as AxiosError<any>).response;
//     Message.error({
//       content: response?.data?.message || error?.message || 'Request Error',
//       duration: 5 * 1000,
//     });
//     return Promise.reject(error);
//   },
// );

export default instance;
