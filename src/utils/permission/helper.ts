import { useUserStore } from '@/stores';

export const hasPermission = (permissionKey: string): boolean => {
  const { permissions } = useUserStore();

  return permissions.some((v) => v === permissionKey);
};
