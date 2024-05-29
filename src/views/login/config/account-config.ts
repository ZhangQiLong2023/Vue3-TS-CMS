export const rules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    // 正则 a-z 0-9 都可以传入 5-10 个 ^ 以什么开头  $ 以什么结尾
    { pattern: /^[A-Za-z0-9]{5,10}$/, message: '用户名必须是5~10个字母或者数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    // 3 位以上 {3,}
    { pattern: /^[a-z0-9]{3,}$/, message: '必须是3位以上的字母或者数字', trigger: 'blur' }
  ]
}
