import { createPinia } from 'pinia';

export * from './locale';
export * from './permission';
export * from './user';
export * from './user_menu';

const store = createPinia();

export default store;
