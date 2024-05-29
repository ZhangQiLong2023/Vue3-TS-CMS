// 对页面中固定死的东西进行抽离

// 用户管理内容配置
export const contentTableConfig = {
  // 针对于 userList 添加配置文件
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'realname', label: '真实姓名', minWidth: '100' },
    { prop: 'cellphone', label: '手机号码', minWidth: '100' },
    { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
    { prop: 'createAt', label: '创建时间', minWidth: '100', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '100', slotName: 'updateAt' },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],

  // 是否显示序号，默认显示，再次使用可以根据传入的 true 和 false 来决定是否显示
  showIndexColum: true,
  // 选中按钮功能
  showSelectColumn: true,

  // 决定ql-table header的标题
  title: '用户列表'
}
