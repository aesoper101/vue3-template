import { defineConfig, mergeConfig } from 'vite';
import baseConfig from './vite.config.base';
import configCompressPlugin from './plugin/compress';
import configVisualizerPlugin from './plugin/visualizer';
import configImageminPlugin from './plugin/imagemin';
import banner from './plugin/banner';
import pwa from './plugin/pwa';

export default defineConfig(({ mode }) => {
  return mergeConfig(
    {
      mode: mode,
      plugins: [
        configCompressPlugin('gzip'),
        configVisualizerPlugin(),
        configImageminPlugin(),
        pwa(),
        banner(),
      ],
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              arco: ['@arco-design/web-vue'],
              chart: ['echarts', 'vue-echarts'],
              vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
            },
          },
        },
        chunkSizeWarningLimit: 2000,
      },
    },
    baseConfig,
  );
});
