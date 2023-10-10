
import * as common from './common'
import * as help from './help'

// constant code和name转换
export const codeToName = (code, options) => {
  if ((!code && code !== 0 && code !== false) || !options) { return '' }
  for (var element of options) {
    if (Number(code) === Number(element.code) || code === element.code) {
      return element.name
    }
  }
  return ''
}

export default {
  ...common,
  ...help
}
