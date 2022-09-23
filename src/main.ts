import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
/* eslint-disable-next-line */
import 'virtual:windi-devtools';
/* eslint-disable-next-line */
import 'virtual:windi.css';
import 'normalize.css';
// 全量导入arco-design样式
// import '@arco-design/web-vue/dist/arco.css';
import '@/assets/styles/index.less';

createApp(App).mount('#app');
