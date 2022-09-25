// import type { AxiosResponse } from 'axios';
import axios from 'axios';
// import type { APIResult } from '@/utils/http/type';
// import { Message } from '@arco-design/web-vue';
import { BearerTokenInterceptor, RefreshTokenInterceptor } from '@/utils/http/interceptors/token';
import type {
  AxiosRequestInterceptor,
  AxiosResponseInterceptor,
} from '@/utils/http/interceptors/type';

const controller = new AbortController();

// request 拦截器列表 ,注意是先进后出
const requestInterceptors: AxiosRequestInterceptor[] = [
  RefreshTokenInterceptor(controller),
  BearerTokenInterceptor(),
];

// response 拦截器列表 ,注意是先进先出
const responseInterceptors: AxiosResponseInterceptor[] = [];

const instance = axios.create({
  signal: controller.signal,
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

requestInterceptors.forEach((interceptor) => {
  instance.interceptors.request.use(interceptor.onFulfilled, interceptor.onRejected);
});

responseInterceptors.forEach((interceptor) => {
  instance.interceptors.response.use(interceptor.onFulfilled, interceptor.onRejected);
});

instance.interceptors.response.use((res) => {
  console.log('-==============3');
  console.log(res);
  return Promise.resolve(res);
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
instance.interceptors.response.use(
  (res) => {
    console.log('-==============4');
    console.log(res);
    return res;
  },
  (error) => {
    console.log('-==============5');
    console.log(error);
  },
);
export default instance;
