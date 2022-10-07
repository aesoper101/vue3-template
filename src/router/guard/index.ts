import type { Router } from 'vue-router';
import { setRouteEmitter } from '@/utils/router';
import setupUserLoginInfoGuard from '@/router/guard/userLoginInfo';
import { isNavigationFailure } from 'vue-router';
import NProgress from 'nprogress';

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    setRouteEmitter(to);
  });
}

export default function createRouteGuard(router: Router) {
  setErrorHandler(router);
  setupPageGuard(router);
  setupUserLoginInfoGuard(router);
  createAfterGuard(router);
}

function createAfterGuard(router: Router) {
  router.afterEach((to, from, failure) => {
    if (isNavigationFailure(failure)) {
      console.log('failed navigation ', failure);
    }
    NProgress.done();
  });
}

function setErrorHandler(router: Router) {
  router.onError((error, to, from) => {
    console.log('ErrorHandler', error, to, from);
  });
}
