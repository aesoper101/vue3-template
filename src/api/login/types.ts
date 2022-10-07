export interface LoginInput {
  username: string;
  password: string;
  captcha: string;
  uuid: string;
}

export interface LoginResult {
  token: string;
  refreshToken: string;
  expireTime: number;
}

export interface RefreshTokenInput {
  refreshToken: string;
}

export interface RefreshTokenResult {
  token: string;
  expireTime: number;
}
