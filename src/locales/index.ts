import { createI18n } from 'vue-i18n';
import enUS from './en-US';
import zhCN from './zh-CN';

type MessageSchema = typeof enUS;

export const LOCALE_OPTIONS = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
];

export const defaultLocale = 'zh-CN';

const i18n = createI18n<[MessageSchema], 'en-US' | 'zh-CN'>({
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  allowComposition: true,
  messages: {
    'en-US': enUS,
    'zh-CN': zhCN,
  },
  silentTranslationWarn: true,
  silentFallbackWarn: true,
});

export default i18n;
