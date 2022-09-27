import type { TimeResponse } from '@/api/common';

export interface Menu extends TimeResponse {
  // 菜单ID
  id: number;
  // 上级菜单ID
  parentId: number;
  // 菜单名称
  name: string;
  // 路由path, 存在则添加到动态路由
  router?: string | null;
  // 权限标识
  perms?: string[] | null;
  // 资源类型  0: 目录 1: 菜单 2: 权限/按钮
  type: EnumResource;
  // 资源图标
  icon: string;
  // 资源排序
  orderNum: number;
  // 页面path
  viewPath: string;
  // 是否缓存页面
  keepalive: boolean;
  // 是否显示
  isShow: boolean;
}

export enum EnumResource {
  // 分组
  GROUP,
  // 菜单
  MENU,
  // 权限/按钮
  PERMISSION,
}
