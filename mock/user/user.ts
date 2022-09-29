import type { MockMethod } from 'vite-plugin-mock';
import { resultListSuccess, resultSuccess } from '../_utils';

export default [
  {
    url: '/api/v1/user/getUserInfo',
    method: 'get',
    rawResponse: async (req, res) => {
      res.statusCode = 200;
      res.end(
        JSON.stringify(
          resultSuccess({
            sex: 1,
            username: 'testxiao',
            image: 'testurl',
          }),
          // resultError('eer', { code: 100358 }),
        ),
      );
    },
  },
  {
    url: '/api/v1/user/permission',
    method: 'get',
    response: () => {
      return resultListSuccess(['sys.user.add', 'sys.user.list']);
    },
  },
  {
    url: '/api/v1/user/getUserMenu',
    method: 'get',
    response: () => {
      return resultListSuccess([]);
    },
  },
] as MockMethod[];
