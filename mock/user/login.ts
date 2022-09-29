import type { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_utils';

export default [
  {
    url: '/api/v1/login',
    method: 'post',
    response: () => {
      return resultSuccess({
        refreshToken: 'test',
        token: 'refreshToken',
        expireTime: 1664350814000,
      });
    },
  },
  {
    url: '/api/v1/refreshToken',
    method: 'post',
    rawResponse: async (req, res) => {
      res.statusCode = 200;
      res.end(
        JSON.stringify(
          resultSuccess({
            // refreshToken: 'test',
            token: 'refreshToken',
            expireTime: 1664350814000,
          }),
        ),
      );
    },
  },
] as MockMethod[];
