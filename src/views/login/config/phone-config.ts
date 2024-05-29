export const rules = {
  num: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^[0-9]{11,11}$/, message: '手机号必须是11位数字', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入6位数字验证码', trigger: 'blur' },
    // 3 位以上 {3,}
    { pattern: /^[0-9]{6,6}$/, message: '验证码格式错误', trigger: 'blur' }
  ]
}
