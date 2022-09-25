import type { AxiosRequestConfig, AxiosResponse } from 'axios';

interface AxiosInterceptor<V, T = V> {
  onFulfilled?: (value: V) => T | Promise<T>;
  onRejected?: (error: any) => any;
}

export type AxiosRequestInterceptor = AxiosInterceptor<AxiosRequestConfig>;
export type AxiosResponseInterceptor = AxiosInterceptor<AxiosResponse>;
