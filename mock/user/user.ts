import type { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_utils';

export default [
  {
    url: '/api/v1/user/getUserInfo',
    method: 'get',
    // response: () => {
    //   return resultSuccess({
    //     sex: 1,
    //     username: 'testxiao',
    //     image: 'testurl',
    //   });
    // },
    rawResponse: async (req, res) => {
      res.statusCode = 401;
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
] as MockMethod[];
