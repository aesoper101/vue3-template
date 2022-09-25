import type { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_utils';

export default [
  {
    url: '/api/v1/user/getUserInfo',
    method: 'get',
    response: () => {
      return resultSuccess({
        sex: 1,
        username: 'testxiao',
        image: 'testurl',
      });
    },
  },
] as MockMethod[];
