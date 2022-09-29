import { ConfigProvider } from '@arco-design/web-vue';
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import { storeToRefs } from 'pinia';
import { useLocaleStore } from '@/stores';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup: () => {
    const store = useLocaleStore();
    const { getLocale } = storeToRefs(store);
    const locale = computed(() => {
      switch (getLocale.value) {
        case 'zh-CN':
          return zhCN;
        case 'en-US':
          return enUS;
        default:
          return enUS;
      }
    });

    return () => (
      <ConfigProvider locale={locale.value}>
        <RouterView />
      </ConfigProvider>
    );
  },
});
