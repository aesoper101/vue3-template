import { useRequest } from '@/utils/http/request';
import type { APIResult } from '@/utils/http/type';
import type { GetUserInfoResponse } from './types';

class UserApi {
  public getUserInfo<T = GetUserInfoResponse, R = APIResult<T>>() {
    return useRequest<R>('/v1/user/getUserInfo', {
      method: 'get',
    });
  }
}

export const userApi = new UserApi();
