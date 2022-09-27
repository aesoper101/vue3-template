import { defineConfig, loadEnv, mergeConfig } from 'vite';
import type { ServerOptions, ProxyOptions } from 'vite';
import eslint from 'vite-plugin-eslint';
import type { UserConfig } from 'vite';
import baseConfig from './vite.config.base';
import { wrapperEnv } from './utils';
import { createMockPlugin } from './plugin/mock';
import validateEnv from './plugin/validateEnv';

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions & { rewrite?: (path: string) => string }>;

const httpsRE = /^https:\/\//;

const createProxy = (proxyList: ProxyList): Record<string, string | ProxyOptions> => {
  if (!proxyList) {
    return {};
  }
  const ret: ProxyTargetList = {};
  for (const [prefix, target] of proxyList) {
    const isHttps = httpsRE.test(target);

    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      // 重写api请求地址
      // rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
};

export default defineConfig(({ mode }) => {
  const originEnv = loadEnv(mode, process.cwd());
  const env = wrapperEnv(originEnv);

  const serverOptions: ServerOptions = {
    open: true,
    fs: {
      // 限制为工作区 root 路径以外的文件的访问。
      strict: true,
      // 可以为项目根目录的上一级提供服务
      allow: ['..'],
    },
    port: env.VITE_PORT,
    proxy: env.VITE_MOCK_ENABLED ? {} : createProxy(env.VITE_PROXY),
  };

  return mergeConfig(
    {
      mode: mode,
      server: serverOptions,
      plugins: [
        eslint({
          cache: false,
          include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
          exclude: ['node_modules'],
        }),
        createMockPlugin(false),
        validateEnv(),
      ],
    } as UserConfig,
    baseConfig,
  );
});
