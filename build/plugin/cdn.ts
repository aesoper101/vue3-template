import importToCDN, { autoComplete } from 'vite-plugin-cdn-import';

export default function importCDNResource() {
  return importToCDN({
    modules: [
      autoComplete('vue'), // vue2 use autoComplete('vue2')
      autoComplete('@vueuse/shared'),
      autoComplete('@vueuse/core'),
      autoComplete('axios'),
      autoComplete('lodash'),
      autoComplete('crypto-js'),
      // {
      //   name: 'element-plus',
      //   var: 'ElementPlus',
      //   path: 'https://unpkg.com/element-plus/lib/index.full.js',
      //   css: 'https://unpkg.com/element-plus/lib/theme-chalk/index.css',
      // },
    ],
    // prodUrl: 'https://cdn.jsdelivr.net/npm/{name}@{version}/{path}',
  });
}
