import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

// dayjs 库默认不支持 utc 格式的时间，所以需要先将 utc 导入到 dayjs 库中
dayjs.extend(utc)

const DATA_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss' // 格式化默认值

export function formatUtcString(utcString: string, format: string = DATA_TIME_FORMAT) {
  // 使用 dayjs 库 npm install dayjs
  return dayjs.utc(utcString).format(format)
}
