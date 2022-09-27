import type { ComponentPublicInstance } from 'vue';

/**
 * 向追踪服务报告错误, 诸如 Sentry 和 Bugsnag 等服务
 * @param err
 * @param instance
 * @param info
 */
export const errorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  err: unknown,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  instance: ComponentPublicInstance | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  info: string,
): void => {
  return;
};

/**
 * 向追踪服务报告warning, 诸如 Sentry 和 Bugsnag 等服务
 * @param err
 * @param instance
 * @param info
 */
export const warnHandler = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  err: unknown,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  instance: ComponentPublicInstance | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  info: string,
): void => {
  return;
};
