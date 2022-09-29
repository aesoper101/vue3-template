export const LOGIN_NAME = 'Login';

export const NOT_FOUND_NAME = 'notfound';

export const REDIRECT_NAME = 'Redirect';

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const PAGE_NOT_FOUND_NAME = 'PageNotFound';

export const DEFAULT_ROUTE_NAME = 'Workplace';

// 免登录白名单
export const whiteNameList = [LOGIN_NAME, 'icons', 'error', 'error-404'] as const; // no redirect whitelist

export type WhiteNameList = typeof whiteNameList;

export type WhiteName = typeof whiteNameList[number];
