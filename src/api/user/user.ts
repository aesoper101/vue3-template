import { useRequest } from '@/utils/http/request';
import type { UserInfo } from './types';
import type { Menu } from '@/api/menu';

class UserApi {
  /**
   * 获取登录用户信息
   */
  public getUserInfo<T = UserInfo, R = APIResult<T>>() {
    return useRequest<R>('/v1/user/getUserInfo', {
      method: 'get',
    });
  }

  /**
   * 获取登录用户菜单
   */
  public getUserMenus<T = Menu, R = APIListResult<T>>() {
    return useRequest<R>('/v1/user/getUserMenu', { method: 'get' });
  }

  /**
   * 获取登录用户权限
   */
  public getUserPermissions<T = string, R = APIListResult<T>>() {
    return useRequest<R>('/v1/user/permission', { method: 'get' });
  }
}

export const userApi = new UserApi();
