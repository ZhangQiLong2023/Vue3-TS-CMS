// 对页面中固定死的东西进行抽离

// 用户管理内容配置
export const contentTableConfig = {
  // 针对于 userList 添加配置文件
  propList: [
    { prop: 'name', label: '角色名', minWidth: '100' },
    { prop: 'intro', label: '权限介绍', minWidth: '100' },
    { prop: 'createAt', label: '创建时间', minWidth: '100', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '100', slotName: 'updateAt' },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],

  // 是否显示序号，默认显示，再次使用可以根据传入的 true 和 false 来决定是否显示
  showIndexColum: true,
  // 选中按钮功能
  showSelectColumn: true,

  // 决定ql-table header的标题
  title: '角色列表'
}
