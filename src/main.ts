import { createApp } from 'vue';
import App from './App';

import store from '@/stores';
import router from '@/router';
import i18n from './locales';

// 导入配置
import './config/vee-validate';

/* eslint-disable-next-line */
import 'virtual:windi-devtools';
/* eslint-disable-next-line */
import 'virtual:windi.css';
import 'normalize.css';
// 全量导入arco-design及样式
// import ArcoVue from '@arco-design/web-vue';
// import '@arco-design/web-vue/dist/arco.css';
// 全量导入风格平台生成的主题样式
// import '@arco-themes/vue-hospital-system/index.less';

import '@/assets/styles/index.less';

import { vHasPermissionDirective } from '@/directives';
import { errorHandler, warnHandler } from '@/utils/error-handle';
import { hasPermission } from '@/utils/permission';

const app = createApp(App);

app.use(store).use(router).use(i18n).directive('permission', vHasPermissionDirective).mount('#app');

app.config.errorHandler = errorHandler;
app.config.warnHandler = warnHandler;
app.config.globalProperties.$auth = hasPermission;
