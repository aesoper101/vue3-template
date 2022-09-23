<template>
  <div>HomeView</div>
  <a-button type="primary" @click="changeLanguage">test</a-button>
  <a-time-picker />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import useLocale from '@/hooks/locale';

  export default defineComponent({
    name: 'HomeView',
    setup: () => {
      const { changeLocale, currentLocale } = useLocale();

      const changeLanguage = () => {
        changeLocale(currentLocale.value != 'en-US' ? 'en-US' : 'zh-CN');
      };

      return { changeLanguage };
    },
  });
</script>

<style scoped></style>
