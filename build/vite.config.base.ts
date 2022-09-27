import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import windiCSS from './plugin/windiCSS';
import configResolverPlugin from './plugin/resolvers';
import configVitePluginForArco from './plugin/arco';
import configStyleImportPlugin from './plugin/styleImport';
import autoImport from './plugin/autoImport';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    svgLoader({ svgoConfig: {} }),
    configResolverPlugin(),
    autoImport(),
    configStyleImportPlugin(),
    configVitePluginForArco(),
    windiCSS(),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../src'),
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, '../src/assets'),
      },
      {
        find: 'types',
        replacement: resolve(__dirname, '../types'),
      },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js', // Resolve the i18n warning issue
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js', // compile template
      },
    ],
    extensions: ['.ts', '.js', '.tsx'],
  },
  define: {
    'process.env': {},
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // hack: `true; @import (reference) "${resolve(
          //   'src/assets/style/var.less'
          // )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
});
