import { configure, defineRule } from 'vee-validate';
import { localize } from '@vee-validate/i18n';
import * as rules from '@vee-validate/rules';

import en from '@vee-validate/i18n/dist/locale/en.json';
import zh_CN from '@vee-validate/i18n/dist/locale/zh_CN.json';

configure({
  generateMessage: localize({
    'en-US': en,
    'zh-CN': zh_CN,
  }),
  validateOnChange: true,
  validateOnBlur: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

Object.keys(rules.default).forEach((rule) => {
  // @ts-ignore
  defineRule(rule, rules[rule]);
});
