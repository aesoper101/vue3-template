/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv extends ViteEnv {
  __: unknown;
  VITE_API_BASE_URL: string;
  VITE_PORT: number;
  VITE_MOCK_ENABLED: boolean;
  VITE_PROXY: [string, string][];
}
