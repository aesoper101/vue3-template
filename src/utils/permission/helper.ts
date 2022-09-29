import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';

/**
 * 判断是覅拥有权限
 * @param permissionKey
 */
export const hasPermission = (permissionKey: string): boolean => {
  const store = useUserStore();
  const { permissions } = storeToRefs(store);

  return permissions.value.some((v) => v === permissionKey);
};
