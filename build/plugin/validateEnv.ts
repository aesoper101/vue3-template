import { Schema, ValidateEnv } from '@julr/vite-plugin-validate-env';

export default function validateEnv(isDev = true) {
  if (!isDev) {
    return ValidateEnv({
      VITE_API_BASE_URL: Schema.string({ message: 'You must set VITE_API_BASE_URL !' }),
      VITE_USE_CDN: Schema.boolean({ message: 'You must set VITE_USE_CDN !' }),
    });
  }

  return ValidateEnv({
    VITE_PORT: Schema.number({ message: 'You must set a port !' }),
    VITE_PROXY: Schema.string({ message: 'You must set a server http proxy!' }),
    VITE_MOCK_ENABLED: Schema.boolean({ message: 'You must set VITE_MOCK_ENABLED !' }),
    VITE_API_BASE_URL: Schema.string({ message: 'You must set VITE_API_BASE_URL !' }),
  });
}
