import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    // 路由标识
    id: string;
    // 每个路由都必须声明
    requiresAuth: boolean;
    icon?: string; // The icon show in the side menu
    locale?: string; // The locale name show in a side menu and breadcrumb
    hideInMenu?: boolean; // If true, it is not displayed in the side menu
    hideChildrenInMenu?: boolean; // if set true, the children are not displayed in the side menu
    activeMenu?: string; // if set name, the menu will be highlighted according to the name you set
    order?: number; // Sort routing menu items. If set key, the higher the value, the more forward it is
    // noAffix?: boolean; // if set true, the tag will not affix in the tab-bar
    // ignoreCache?: boolean; // if set true, the page will not be cached
  }
}
