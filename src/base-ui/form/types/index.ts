import { placeholderSign } from 'element-plus/es/components/table-v2/src/private'

type IFormType = 'input' | 'password' | 'select' | 'datepicker'
export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对 select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  itemStyle?: []
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemLayout?: any
}
