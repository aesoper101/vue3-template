interface ImportMetaEnv extends ViteEnv {
  __: unknown;
  VITE_API_BASE_URL: string;
  VITE_PORT: number;
  VITE_MOCK_ENABLED: boolean;
  VITE_PROXY: [string, string][];
  VITE_USE_CDN: boolean;
}
