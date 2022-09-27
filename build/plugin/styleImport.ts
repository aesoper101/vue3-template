/**
 * Introduces component library styles on demand.
 * 按需引入组件库样式
 * https://github.com/anncwb/vite-plugin-style-import
 */

import { createStyleImportPlugin } from 'vite-plugin-style-import';

export default function configStyleImportPlugin() {
  return createStyleImportPlugin({
    libs: [
      // 字节Arco框架样式按需引入
      // {
      //   libraryName: '@arco-design/web-vue',
      //   esModule: true,
      //   resolveStyle: (name) => {
      //     // css
      //     // return `@arco-design/web-vue/es/${name}/style/css.js`
      //     // less
      //     return `@arco-design/web-vue/es/${name}/style/index.js`;
      //   },
      // },
    ],
  });
}
