<template>
  <div>HomeView</div>
  <a-button type="primary" @click="changeLanguage" v-permission>test</a-button>
  <a-button type="primary" @click="login">登录</a-button>
  <a-button type="primary" @click="getUserInfo">获取信息</a-button>
  <div>{{ userInfo?.sex }}</div>
  <p>测试</p>
  <a-time-picker />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import useLocale from '@/hooks/locale';

  import { userApi, type UserInfo } from '@/api/user';
  import { useUserStore } from '@/stores';

  export default defineComponent({
    name: 'HomeView',
    setup: () => {
      const { changeLocale, currentLocale } = useLocale();
      const { doLogin } = useUserStore();

      const userInfo = ref<UserInfo>();

      const changeLanguage = () => {
        changeLocale(currentLocale.value != 'en-US' ? 'en-US' : 'zh-CN');
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
        });
      };
      const a: Nullable<string> = null;

      console.log(a);
      return {
        changeLanguage,
        login: () => doLogin({ username: '1', password: '1' }),
        getUserInfo,
        userInfo,
      };
    },
  });
</script>

<style scoped></style>
