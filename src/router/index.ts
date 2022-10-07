import { createRouter, createWebHashHistory } from 'vue-router';

import createRouteGuard from '@/router/guard';
import { DEFAULT_ROUTE_NAME, LOGIN_NAME } from '@/constants';
import Layout from '@/layouts/default/Layout';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: DEFAULT_ROUTE_NAME,
      component: Layout,
      // redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: '/systemUser',
          name: 'systemUser',
          component: () => import('@/views/system/user/List'),
        },
      ],
    },
    {
      path: '/login',
      name: LOGIN_NAME,
      component: () => import('@/views/login/Login'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

createRouteGuard(router);

export default router;
