import './index.less';
import { useI18n } from 'vue-i18n';
import { Button, Input, InputPassword, Space } from '@arco-design/web-vue';

export default defineComponent({
  name: 'Login',
  setup: () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    const { t } = useI18n();

    return () => (
      <div class={'login-container'}>
        <div class={'login-container-bg'}>
          <div class={'top-rect'}></div>
          <div class={'bottom-rect'}></div>
        </div>
        <div class={'login-container-content'}>
          <div class={'title'}>河池市民族医院电子化办公系统</div>
          <div class={'login-wrapper'}>
            <div class={'login-form'}>
              <Space direction={'vertical'} size={'large'} fill={true}>
                <Input size={'large'} />
                <InputPassword />
                <Input size={'large'} />
                <Button type={'primary'} size={'large'} long={true}>
                  立即登录
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
