import './index.less';
import { useI18n } from 'vue-i18n';
import { Button, Checkbox, Input, Link, Message, Space } from '@arco-design/web-vue';
import { IconLock, IconSafe, IconUser } from '@arco-design/web-vue/es/icon';
import { useUserStore } from '@/stores';
import { useField, useForm } from 'vee-validate';
import * as zod from 'zod';
import { toFormValidator } from '@vee-validate/zod';
import type { LoginInput } from '@/api/login';
import { DEFAULT_ROUTE_NAME } from '@/constants';

export default defineComponent({
  name: 'Login',
  setup: () => {
    const { t } = useI18n();
    const isLoading = ref(false);
    const store = useUserStore();
    const remember = ref(store.getRememberInfo !== null);

    const router = useRouter();
    const route = useRoute();

    const schema = toFormValidator(
      zod.object({
        username: zod.string().min(1, t('login.form.username.required')),
        password: zod.string().min(1, t('login.form.password.required')),
        captcha: zod.string().min(1, t('login.form.captcha.required')),
      }),
    );

    const {
      values: loginInput,
      errors,
      meta,
    } = useForm<LoginInput>({
      validationSchema: schema,
      validateOnMount: false,
      initialValues: {
        username: store.getRememberInfo?.username || '',
        password: store.getRememberInfo?.password || '',
        uuid: '',
        captcha: '',
      },
    });

    useField('username');
    useField('password');
    useField('captcha');

    const doLogin = () => {
      isLoading.value = true;
      store.doLogin(loginInput, remember.value).then(
        () => {
          isLoading.value = false;
          Message.success(t('login.message.success'));
          if (route.query.redirect && typeof route.query.redirect == 'string') {
            router.push({ path: route.query.redirect, replace: true });
          } else {
            router.push({ name: DEFAULT_ROUTE_NAME, replace: true });
          }
        },
        () => {
          isLoading.value = false;
        },
      );
    };

    return () => (
      <div class={'login-container'}>
        <div class={'login-container-bg'}>
          <div class={'top-rect'}></div>
          <div class={'bottom-rect'}></div>
        </div>
        <div class={'login-container-content'}>
          <div class={['title']}>
            <span class={'break-all'}>{t('login.system.hotspital')}</span>
            <span class={'break-all'}>{t('login.system.name')}</span>
          </div>
          <div class={['login-wrapper']}>
            <div class={'login-form'}>
              <Space direction={'vertical'} size={'large'} fill={true}>
                <Input
                  v-model={loginInput.username}
                  size={'large'}
                  placeholder={t('login.label.username')}
                  error={errors.value?.username != undefined}
                >
                  {{ prefix: () => <IconUser /> }}
                </Input>
                <Input
                  size={'large'}
                  type={'password'}
                  v-model={loginInput.password}
                  placeholder={t('login.label.password')}
                  error={errors.value?.password != undefined}
                >
                  {{ prefix: () => <IconLock /> }}
                </Input>
                <Input
                  v-model={loginInput.captcha}
                  size={'large'}
                  placeholder={t('login.label.captcha')}
                  error={errors.value?.captcha != undefined}
                >
                  {{
                    prefix: () => <IconSafe />,
                    suffix: () => <div style={{ width: '100px', height: '100%' }}>2</div>,
                  }}
                </Input>
                <div class={['flex', 'justify-between']}>
                  <Checkbox v-model={remember.value}>
                    {t('login.checkbox.remember.password')}
                  </Checkbox>
                  <Link hoverable={false}>{t('login.checkbox.forget.password')}</Link>
                </div>
                <Button
                  type={'primary'}
                  size={'large'}
                  long={true}
                  loading={isLoading.value}
                  disabled={!meta.value.valid}
                  onClick={doLogin}
                >
                  {t('login.btn.login.now')}
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
