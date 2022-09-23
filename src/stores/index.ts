import { createPinia } from 'pinia';

export { useCounterStore } from '@/stores/counter';

const store = createPinia();

export default store;
