import { Card, Table } from '@arco-design/web-vue';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';

export default defineComponent({
  name: 'UserList',
  setup: () => {
    const columns: TableColumnData[] = [
      { title: '用户名', dataIndex: 'username' },
      { title: '性别', dataIndex: 'sex' },
      { title: '状态', dataIndex: 'status' },
    ];

    return () => (
      <div>
        <Card
          title={'用户列表'}
          bordered={false}
          headerStyle={{ border: 'none' }}
          bodyStyle={{ paddingTop: 0 }}
        >
          <Table columns={columns}></Table>
        </Card>
      </div>
    );
  },
});
