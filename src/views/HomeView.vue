<template>
  <div>HomeView</div>
  <a-button type="primary" @click="changeLanguage" v-permission>test</a-button>
  <a-button type="primary" @click="doLogin">登录</a-button>
  <a-button type="primary" @click="getUserInfo">获取信息</a-button>
  <div>{{ userInfo?.sex }}</div>
  <p>测试</p>
  <a-time-picker />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import useLocale from '@/hooks/locale';
  import { loginApi } from '@/api/login';
  import { useTokenStore } from '@/stores/token';
  import { Message } from '@arco-design/web-vue';
  import { userApi, type GetUserInfoResponse } from '@/api/user';

  export default defineComponent({
    name: 'HomeView',
    setup: () => {
      const { changeLocale, currentLocale } = useLocale();
      const { setToken, setRefreshToken, setExpireTime } = useTokenStore();

      const userInfo = ref<GetUserInfoResponse>();

      const changeLanguage = () => {
        changeLocale(currentLocale.value != 'en-US' ? 'en-US' : 'zh-CN');
      };

      const { execute, data } = loginApi.login({ username: '11', password: '22' });

      const doLogin = () => {
        execute().then(() => {
          Message.success(data.value?.message || '登录成功');
          setToken(data.value?.result.token);
          setRefreshToken(data.value?.result.refreshToken);
          setExpireTime(data.value?.result.expireTime);
        });
      };

      const { execute: doGetUserInfo, data: userInfoResult } = userApi.getUserInfo();

      const getUserInfo = () => {
        doGetUserInfo().then((res) => {
          console.log(
            'userInfoResult.value == ',
            userInfoResult.value,
            res.data.value?.result.sex,
            // error,
          );
          // console.log(userInfoResult.value);
          // userInfo.value = userInfoResult.value?.result;
        });
      };

      return { changeLanguage, doLogin, getUserInfo, userInfo };
    },
  });
</script>

<style scoped></style>
