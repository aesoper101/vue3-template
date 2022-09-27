export function isReportMode(): boolean {
  return process.env.REPORT === 'true';
}

export interface ViteEnv {
  VITE_API_BASE_URL: string;
  VITE_PORT: number;
  VITE_MOCK_ENABLED: boolean;
  VITE_PROXY: [string, string][];
  VITE_USE_CDN: boolean;
}

export function wrapperEnv(envConf: Record<string, any>): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = '';
      }
    }
    ret[envName] = realName;
    if (typeof realName === 'string') {
      process.env[envName] = realName;
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
}
