import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Message } from '@arco-design/web-vue';
import { useLocaleStore } from '@/stores';

export default function useLocale() {
  const i18 = useI18n();
  const store = useLocaleStore();
  const currentLocale = computed(() => {
    return store.getLocale || i18.locale.value;
  });
  const changeLocale = (value: string) => {
    i18.locale.value = value;
    store.setLocale(value);
    Message.success(i18.t('navbar.action.locale'));
  };
  return {
    currentLocale,
    changeLocale,
  };
}
