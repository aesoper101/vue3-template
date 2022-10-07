import { LayoutSider, Menu, MenuItem, MenuItemGroup } from '@arco-design/web-vue';

import './index.less';

export default defineComponent({
  name: 'DefaultLayoutSider',
  setup: () => {
    return () => (
      <LayoutSider width={232} class={['default-layout-sider']}>
        <div class={'pt-lg'}>
          <Menu>
            <MenuItem>工作台</MenuItem>
            <MenuItemGroup title={'title'}>
              <MenuItem>工作台</MenuItem>
            </MenuItemGroup>
          </Menu>
        </div>
      </LayoutSider>
    );
  },
});
