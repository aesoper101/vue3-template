import { defineStore } from 'pinia';

export const userPermission = defineStore('permission', () => {
  const permissionList = ref<string[]>([]);

  const hasPermission = (permissionKey: string): boolean => {
    return permissionList.value.indexOf(permissionKey) > -1;
  };

  return { hasPermission };
});
