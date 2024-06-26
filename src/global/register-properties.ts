import type { App } from 'vue'
import { formatUtcString } from '@/utils/date-format'

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      // 格式化shi
      return formatUtcString(value)
    }
  }
}
