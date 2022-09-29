import type { ComponentPublicInstance } from 'vue';

/**
 * 向追踪服务报告错误, 诸如 Sentry 和 Bugsnag 等服务
 * @param err
 * @param instance
 * @param info
 */
export const errorHandler = (
  err: unknown,
  instance: ComponentPublicInstance | null,
  info: string,
): void => {
  console.log(err, info);
  return;
};

/**
 * 向追踪服务报告warning, 诸如 Sentry 和 Bugsnag 等服务
 * @param err
 * @param instance
 * @param info
 */
export const warnHandler = (
  err: unknown,
  instance: ComponentPublicInstance | null,
  info: string,
): void => {
  console.log(err, info);
  return;
};
