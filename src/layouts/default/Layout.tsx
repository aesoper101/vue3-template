import { defineComponent } from 'vue';
import { Layout, LayoutContent } from '@arco-design/web-vue';
import { RouterView } from 'vue-router';

import './index.less';
import Header from '@/layouts/default/header/Header';
import Sider from '@/layouts/default/sider/Sider';

export default defineComponent({
  name: 'DefaultLayout',
  setup: () => {
    return () => (
      <Layout class={'default-layout'}>
        <Header />
        <Layout>
          <Sider />
          <LayoutContent class={['p-lg']}>
            <RouterView />
          </LayoutContent>
        </Layout>
      </Layout>
    );
  },
});
