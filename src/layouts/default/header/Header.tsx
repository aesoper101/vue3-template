import {
  Avatar,
  Badge,
  Button,
  Doption,
  Dropdown,
  LayoutHeader,
  Modal,
  Space,
  TypographyTitle,
} from '@arco-design/web-vue';
import {
  IconFullscreen,
  IconFullscreenExit,
  IconLanguage,
  IconNotification,
  IconPoweroff,
  IconSearch,
  IconTool,
  IconUser,
} from '@arco-design/web-vue/es/icon';

import './index.less';
import { useUserStore } from '@/stores';
import { useI18n } from 'vue-i18n';
import useLocale from '@/hooks/locale';
import { useFullscreen } from '@vueuse/core';

export default defineComponent({
  name: 'DefaultLayoutHeader',
  setup: () => {
    const store = useUserStore();
    const { t } = useI18n();
    const { changeLocale } = useLocale();
    const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();

    // 退出登录
    const handleLogout = () => {
      Modal.confirm({
        title: t('confirm.logout'),
        content: t('do.logged.out.warning'),
        okText: t('confirmText'),
        titleAlign: 'start',
        cancelText: t('cancelText'),
        onOk: () => {
          store.doLogout().then(() => {
            window.location.reload();
          });
        },
      });
    };

    const onLanguageSelect = (
      value: string | number | Record<string, any> | undefined,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
      evt: Event,
    ) => {
      if (typeof value == 'string') {
        changeLocale(value);
      }
    };

    const renderAvatar = () => {
      return (
        <Dropdown>
          {{
            default: () => <Avatar size={32} />,
            content: () => (
              <>
                <Doption>
                  {{
                    default: () => t('userSettings'),
                    icon: () => <IconUser />,
                  }}
                </Doption>
                <Doption>
                  {{
                    default: () => t('userCenter'),
                    icon: () => <IconTool />,
                  }}
                </Doption>
                <Doption onClick={handleLogout}>
                  {{
                    default: () => t('logout'),
                    icon: () => <IconPoweroff />,
                  }}
                </Doption>
              </>
            ),
          }}
        </Dropdown>
      );
    };

    const renderLanguageBtn = () => {
      return (
        <Dropdown onSelect={onLanguageSelect}>
          {{
            default: () => (
              <Button type={'outline'} shape={'circle'} class={'nav-btn'}>
                <IconLanguage />
              </Button>
            ),
            content: () => (
              <>
                <Doption value={'zh-CN'}>
                  {{
                    default: () => t('locale.ZH'),
                    icon: () => <IconTool />,
                  }}
                </Doption>
                <Doption value={'en-US'}>
                  {{
                    default: () => t('locale.EN'),
                    icon: () => <IconTool />,
                  }}
                </Doption>
              </>
            ),
          }}
        </Dropdown>
      );
    };

    const renderRightNav = () => {
      return (
        <Space size={'large'}>
          <Button type={'outline'} shape={'circle'} class={'nav-btn'}>
            <IconSearch />
          </Button>
          {renderLanguageBtn()}
          <Badge count={10}>
            <Button type={'outline'} shape={'circle'} class={'nav-btn'}>
              <IconNotification />
            </Button>
          </Badge>
          <Button type={'outline'} shape={'circle'} class={'nav-btn'} onClick={toggleFullScreen}>
            {isFullscreen.value && <IconFullscreenExit />}
            {!isFullscreen.value && <IconFullscreen />}
          </Button>
          {renderAvatar()}
        </Space>
      );
    };

    return () => (
      <LayoutHeader class={'default-layout-header'}>
        <div class={['flex', 'justify-between', 'items-center', 'w-full', 'h-full']}>
          <div class={['flex', 'items-center', 'pl-lg', 'left-logo']}>
            <Space>
              <img
                alt="logo"
                src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
              />
              {h(
                TypographyTitle,
                { heading: 5, ellipsis: true, class: ['flex-grow', 'pr-lg'] },
                () => '医院系统',
              )}
            </Space>
          </div>
          <div class={['pr-xl']}>{renderRightNav()}</div>
        </div>
      </LayoutHeader>
    );
  },
});
