import { useRequest } from '@/utils/http/request';
import type { LoginInput, LoginResult, RefreshTokenInput, RefreshTokenResult } from './types';

class LoginApi {
  public login<T = LoginResult, R = APIResult<T>>(input: LoginInput) {
    return useRequest<R>('/v1/login', {
      data: input,
      method: 'post',
    });
  }

  public logout<T = LoginResult, R = APIResult<T>>() {
    return useRequest<R>('/v1/logout', {
      method: 'post',
    });
  }

  public refreshToken<T = RefreshTokenResult, R = APIResult<T>>(input: RefreshTokenInput) {
    return useRequest<R>('/v1/refreshToken', {
      data: input,
      method: 'post',
      headers: { Authorization: input.refreshToken },
    });
  }
}

export const loginApi = new LoginApi();
