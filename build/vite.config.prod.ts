import { defineConfig, loadEnv, mergeConfig } from 'vite';
import type { UserConfig } from 'vite';
import baseConfig from './vite.config.base';
import configCompressPlugin from './plugin/compress';
import configVisualizerPlugin from './plugin/visualizer';
import configImageminPlugin from './plugin/imagemin';
import banner from './plugin/banner';
import pwa from './plugin/pwa';
import { wrapperEnv } from './utils';
import importCDNResource from './plugin/cdn';

export default defineConfig(({ mode }) => {
  const originEnv = loadEnv(mode, process.cwd());
  const env = wrapperEnv(originEnv);

  return mergeConfig(
    {
      mode: mode,
      plugins: [
        configCompressPlugin('gzip'),
        configVisualizerPlugin(),
        configImageminPlugin(),
        pwa(),
        banner(),
        env.VITE_USE_CDN && importCDNResource(),
      ],
      esbuild: {
        pure: ['console.log'],
      },
      build: {
        cssCodeSplit: true,
        rollupOptions: {
          output: {
            chunkFileNames: 'assets/js/[name]-[hash].js',
            entryFileNames: 'assets/js/[name]-[hash].js',
            assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
            manualChunks: {
              arco: ['@arco-design/web-vue'],
              chart: ['echarts', 'vue-echarts'],
              vue: [
                'vue',
                'vue-router',
                'pinia',
                '@vueuse/core',
                'vue-i18n',
                '@vue/runtime-core',
                '@vue/shared',
                '@vue/runtime-core',
                '@vue/compiler-core',
                '@vue/compiler-dom',
                '@vue/runtime-dom',
              ],
              // lodash: ['lodash'],
            },
          },
        },
        reportCompressedSize: true,
        chunkSizeWarningLimit: 2000,
      },
    } as UserConfig,
    baseConfig,
  );
});
