import type { AxiosResponseInterceptor } from '@/utils/http/interceptors/type';
import { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import i18n from '@/locales';
import { useUserStore } from '@/stores';

export function LastStepResponseInterceptor(): AxiosResponseInterceptor {
  return {
    onFulfilled: (response: AxiosResponse<APIResult>) => {
      console.log('LastStepResponseInterceptor');
      const { t } = i18n.global;
      const res = response.data;
      if (res?.code !== 0) {
        Message.error({
          content: res?.message || t('unknown.mistake'),
          duration: 5 * 1000,
        });
        return Promise.reject(
          new AxiosError(res?.message, undefined, response.config, response.request, response),
        );
      }
      return Promise.resolve(response);
    },
    onRejected: (error: AxiosError<any>) => {
      console.log('LastStepResponseInterceptor error');
      const response = error?.response;
      const { t } = i18n.global;
      if (response?.status && response.status >= 400) {
        if (response.status === 401) {
          Modal.confirm({
            title: t('confirm.logout'),
            content: t('logged.out.warning'),
            okText: t('reLogin'),
            titleAlign: 'start',
            cancelText: t('cancelText'),
            async onOk() {
              const { resetToken } = useUserStore();
              resetToken();
              window.location.reload();
            },
          });
        } else {
          Message.error({
            content:
              t('network.error.message.' + response?.status) ||
              response?.data?.message ||
              error?.message ||
              t('network.exception'),
            duration: 5 * 1000,
          });
        }
      }
      return Promise.reject(error);
    },
  };
}
