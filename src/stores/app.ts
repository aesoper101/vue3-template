import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  // 左侧菜单是否折叠
  const collapsed = ref(false);

  return { collapsed };
});
