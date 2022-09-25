import { viteMockServe } from 'vite-plugin-mock';
import type { PluginOption } from 'vite';

export const createMockPlugin = (isBuild: boolean): PluginOption => {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';

      setupProdMockServer();
      `,
  });
};
