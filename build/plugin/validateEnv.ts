import { Schema, ValidateEnv } from '@julr/vite-plugin-validate-env';

export default function validateEnv() {
  return ValidateEnv({
    VITE_PORT: Schema.number({ message: 'You must set a port !' }),
  });
}
