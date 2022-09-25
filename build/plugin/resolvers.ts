import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

export default function configResolverPlugin() {
  return Components({
    dirs: [], // Avoid parsing src/components.  避免解析到src/components
    deep: false,
    resolvers: [
      // 字节Arco框架组件导入,不导入样式，配合@arco-plugins/vite-vue 插件使用
      // 以便使用风格化平台https://arco.design/themes配置的主题
      ArcoResolver({ importStyle: false }),
    ],
  });
}
