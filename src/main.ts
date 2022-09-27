import { createApp } from 'vue';
import App from './App.vue';

import store from '@/stores';
import router from '@/router';
import i18n from './locales';

/* eslint-disable-next-line */
import 'virtual:windi-devtools';
/* eslint-disable-next-line */
import 'virtual:windi.css';
import 'normalize.css';
// 全量导入arco-design及样式
// import ArcoVue from '@arco-design/web-vue';
// import '@arco-design/web-vue/dist/arco.css';
import '@/assets/styles/index.less';

import { vHasPermissionDirective } from '@/directives';

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .directive('permission', vHasPermissionDirective)
  .mount('#app');
