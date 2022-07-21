/**
 * @author MaZiXiao
 * @date 2022-07-19 19:15
 */
/* create_time: "2021-03-21 21:20:54"
default: "150,160,170"
id: 206
name: "身高"
order: 1001
status: 0
type: 0
update_time: "2022-07-19 11:24:30" */
export const columns = [
  {
    title: '规格名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '规格值',
    dataIndex: 'default',
    key: 'default'
  },
  {
    title: '排序',
    dataIndex: 'order',
    key: 'order',
    width: 100
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100
  },
  {
    title: '操作',
    dataIndex: 'operating',
    key: 'operating'
  }
]
