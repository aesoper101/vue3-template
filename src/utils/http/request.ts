import type { AxiosRequestConfig } from 'axios';
import { useAxios } from '@vueuse/integrations/useAxios';
import type { UseAxiosOptions } from '@vueuse/integrations';
import instance from './axios';

export function useRequest<T = any>(
  url: string,
  config: AxiosRequestConfig = {},
  useAxiosOptions: UseAxiosOptions = { immediate: false },
) {
  return useAxios<T>(url, config || {}, instance, useAxiosOptions);
}
