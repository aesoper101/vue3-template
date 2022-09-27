import { defineComponent } from 'vue';
import { Button } from '@arco-design/web-vue';

export default defineComponent({
  setup: () => {
    return () => (
      <div>
        <Button type={'dashed'}></Button>{' '}
      </div>
    );
  },
});
