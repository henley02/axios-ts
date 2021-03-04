import { isArray, isDate, isObject, isUndef } from './util'

/**
 * 特殊字符支持
 * 对于字符 @ : $ , 空格 [] 是允许出现在 url 中的，不希望被encode
 * @param val
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * url、params处理
 * 1、参数是数组foo:['bar','baz'] ,则url为 foo[]=bar&foo[]=baz
 * 2、参数是对象foo:{bar:'baz'} 则url 的foo 后面拼接的是 {"bar":"baz"} encode 后的结果
 * 3、参数是Date类型 {date: new Date()} 则url参数后面拼接的是 date.toISOString() 的结果
 * 4、特殊字符支持：对于字符 @:$,空格[]，是允许出现在 url 中的，不希望被 encode
 * 5、对于值为 null 或者 undefined 的属性，不添加到 url 参数中
 * 6、丢弃 url 中的哈希标记
 * 7、保留 url 中已存在的参数
 * @param url
 * @param params
 */
export function buildURL(url: string, params: any) {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]
    // 对于值为 null 或者 undefined 的属性
    if (isUndef(val)) {
      return
    }
    let values: string[]
    if (isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        // 参数值为 Date 类型
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    // 丢弃 url 中的哈希标记
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
