import { useRequest } from '@/utils/http/request';
import type { APIResult } from '@/utils/http/type';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  expireTime: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  expireTime: number;
}

class TokenApi {
  public login<T = LoginResponse, R = APIResult<T>>(input: LoginRequest) {
    return useRequest<R>('/v1/login', {
      data: input,
      method: 'post',
    });
  }

  public refreshToken<T = RefreshTokenResponse, R = APIResult<T>>(input: RefreshTokenRequest) {
    return useRequest<R>('/v1/refreshToken', {
      data: input,
      method: 'post',
    });
  }
}

export const tokenApi = new TokenApi();
