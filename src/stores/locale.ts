import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { defaultLocale } from '@/locales';
import { LOCALE_STORE_KEY } from '@/constants';

export const useLocaleStore = defineStore('locale', () => {
  const storage = useStorage(LOCALE_STORE_KEY, defaultLocale, localStorage);

  const setLocale = (locale: string) => {
    storage.value = locale;
  };

  const getLocale = computed(() => {
    return storage.value;
  });

  return { setLocale, getLocale };
});
