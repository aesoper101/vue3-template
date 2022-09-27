import { useRequest } from '@/utils/http/request';
import type { APIResult } from '@/utils/http/type';
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './types';

class LoginApi {
  public login<T = LoginResponse, R = APIResult<T>>(input: LoginRequest) {
    return useRequest<R>('/v1/login', {
      data: input,
      method: 'post',
    });
  }

  public logout<T = LoginResponse, R = APIResult<T>>() {
    return useRequest<R>('/v1/logout', {
      method: 'post',
    });
  }

  public refreshToken<T = RefreshTokenResponse, R = APIResult<T>>(input: RefreshTokenRequest) {
    return useRequest<R>(
      '/v1/refreshToken',
      {
        data: input,
        method: 'post',
      },
      { immediate: true },
    );
  }
}

export const loginApi = new LoginApi();
