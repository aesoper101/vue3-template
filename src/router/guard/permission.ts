import type { LocationQueryRaw, Router } from 'vue-router';
import { LOGIN_NAME, NOT_FOUND_NAME } from '@/constants';

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (to.name && !router.hasRoute(to.name)) {
      next({
        name: NOT_FOUND_NAME,
        query: {
          redirect: to.fullPath,
          ...to.query,
        } as LocationQueryRaw,
        replace: true,
      });
      return;
    }

    // 在免登录名单，直接进入
    if (!to.meta.requiresAuth) {
      next();
    } else {
      next({
        name: LOGIN_NAME,
        query: {
          redirect: to.fullPath,
          ...to.query,
        } as LocationQueryRaw,
        replace: true,
      });
    }
  });
}
