import vitePluginForArco from '@arco-plugins/vite-vue';

export default function configVitePluginForArco() {
  return vitePluginForArco({
    // 在风格化平台上所创建的主题包包名https://arco.design/themes
    // 开发时需要注意清理缓存
    theme: '@arco-themes/vue-hospital-system',
    // 目前发现style为true时会出现打包失败的情况，比如找不到input-password的样式
    style: false,
  });
}
