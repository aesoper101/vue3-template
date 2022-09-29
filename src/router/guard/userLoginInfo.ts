import type { LocationQueryRaw, Router } from 'vue-router';
import NProgress from 'nprogress';
import { useUserStore } from '@/stores';
import { DEFAULT_ROUTE_NAME, LOGIN_NAME } from '@/constants';

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();

    const userStore = useUserStore();
    if (userStore.isLogin()) {
      if (to.name === LOGIN_NAME) {
        next({ name: DEFAULT_ROUTE_NAME });
      } else {
        if (userStore.userInfo.uid) {
          next();
        } else {
          try {
            await userStore.doLoadLoginInfo();
            console.log('data', userStore.userAsyncMenuList);
            next();
          } catch (e) {
            await userStore.doLogout();
            next({
              name: LOGIN_NAME,
              query: {
                redirect: to.fullPath,
                ...to.query,
              } as LocationQueryRaw,
            });
          }
        }
      }
    } else {
      next();
    }
  });
}
