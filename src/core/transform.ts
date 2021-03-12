import { AxiosTransformer } from '../types'

/**
 * 转换
 * @param data
 * @param headers
 * @param fns 一个或者多个转换函数
 */
export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }

  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
