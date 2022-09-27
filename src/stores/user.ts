import { defineStore } from 'pinia';
import type { UserInfo } from '@/api/user';
import { userApi } from '@/api/user';
import { merge } from 'lodash-es';
import { loginApi, type LoginInput } from '@/api/login';
import { useStorage } from '@vueuse/core';
import {
  REFRESH_TOKEN_STORE_KEY,
  TOKEN_EXPIRES_TIME_STORE_KEY,
  TOKEN_STORE_KEY,
} from '@/constants';
import { computed } from 'vue';
import type { Menu } from '@/api/menu';

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive<UserInfo>({
    image: '',
    sex: 1,
    username: '',
  });

  const permissionList = ref<string[]>([]);
  const menuList = ref<Menu[]>([]);

  const token = useStorage(TOKEN_STORE_KEY, '', localStorage);
  const refreshToken = useStorage(REFRESH_TOKEN_STORE_KEY, '', localStorage);
  const expireTime = useStorage(TOKEN_EXPIRES_TIME_STORE_KEY, 0, localStorage);

  const isLogin = computed(() => {
    if (token.value && expireTime.value) {
      const nowTime = parseInt(String(new Date().getTime() / 1000));
      // 如果超过60秒重新获取token
      return expireTime.value / 1000 - nowTime > 0;
    }
    return false;
  });

  const isTokenWillExpire = computed(() => {
    if (token.value && expireTime.value) {
      const nowTime = parseInt(String(new Date().getTime() / 1000));
      // 如果超过60秒重新获取token
      const subTime = expireTime.value / 1000 - nowTime;
      return subTime < 60 && subTime > 0;
    }
    return false;
  });

  /** 重置token */
  const resetToken = () => {
    token.value = null;
    refreshToken.value = null;
    expireTime.value = null;
    resultUserInfo();
    resetPermissionAndMenu();
  };

  const resetPermissionAndMenu = () => {
    permissionList.value = [];
    menuList.value = [];
  };

  const resultUserInfo = () => {
    merge(userInfo, {
      image: '',
      sex: 1,
      username: '',
    });
  };

  /** 获取登录个人信息 */
  const loadUserInfo = () => {
    return new Promise<UserInfo>((resolve, reject) => {
      const { execute, data, error } = userApi.getUserInfo();
      execute().then(
        () => {
          merge(userInfo, data.value?.result || {});
          resolve(userInfo);
        },
        () => {
          reject(error);
        },
      );
    });
  };

  /**
   * 加载用户菜单
   */
  const loadUserMenus = () => {
    return new Promise<Menu[]>((resolve, reject) => {
      const { execute, data, error } = userApi.getUserMenus();
      execute().then(
        () => {
          menuList.value = data.value?.result || [];
          resolve(menuList.value);
        },
        () => {
          reject(error);
        },
      );
    });
  };

  /**
   * 加载用户权限
   */
  const loadUserPermissions = () => {
    return new Promise<string[]>((resolve, reject) => {
      const { execute, data, error } = userApi.getUserPermissions();
      execute().then(
        () => {
          permissionList.value = data.value?.result || [];
          resolve(permissionList.value);
        },
        () => {
          reject(error);
        },
      );
    });
  };

  /** 登录 */
  const doLogin = (input: LoginInput) => {
    return new Promise((resolve, reject) => {
      try {
        const { execute, data, error } = loginApi.login(input);
        execute().then(
          () => {
            token.value = data.value?.result.token;
            refreshToken.value = data.value?.result.refreshToken;
            expireTime.value = data.value?.result.expireTime;
            return afterLogin();
          },
          () => {
            reject(error);
          },
        );
      } catch (e) {
        reject(e);
      }
    });
  };

  /** 登录成功之后, 获取用户信息以及生成权限路由 */
  const afterLogin = () => {
    return Promise.all([loadUserInfo(), loadUserMenus(), loadUserPermissions()]);
  };

  /** 刷新token */
  const doRefreshToken = () => {
    return new Promise<string>((resolve, reject) => {
      const { execute, data, error } = loginApi.refreshToken({
        refreshToken: refreshToken.value,
      });
      execute().then(
        () => {
          token.value = data.value?.result.token;
          expireTime.value = data.value?.result.expireTime;
          resolve(token.value);
        },
        () => {
          resetToken();
          reject(error);
        },
      );
    });
  };

  /** 退出登录 */
  const doLogout = () => {
    return new Promise((resolve, reject) => {
      const { execute, error } = loginApi.logout();
      execute().then(
        () => {
          resolve(null);
        },
        () => {
          resetToken();
          reject(error);
        },
      );
    });
  };
  return {
    userInfo,
    doLogin,
    token,
    isTokenWillExpire,
    isLogin,
    doRefreshToken,
    resetToken,
    doLogout,
    permissions: computed(() => permissionList.value),
    userMenuList: computed<Menu[]>(() => menuList.value),
  };
});
