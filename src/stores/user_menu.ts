import { defineStore } from 'pinia';
import type { Menu } from '@/api/menu';

export const useUserMenuStore = defineStore('user_menu', () => {
  const menuList = ref<Menu[]>([]);

  return { menuList };
});
