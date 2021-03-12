const _toString = Object.prototype.toString

export function toRawType(val: any): string {
  return _toString.call(val).slice(8, -1)
}

/**
 * 判断是否是 undefined 或者 null
 * @param val
 */
export function isUndef(val: any): boolean {
  return val === undefined || val === null
}

/**
 * 判断是否是对象
 * @param val
 */
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

/**
 * 判断是否普通对象
 * @param val
 */
export function isPlainObject(val: any): val is Object {
  return toRawType(val) === 'Object'
}

/**
 * 判断是否是日期
 * @param val
 */
export function isDate(val: any): val is Date {
  return toRawType(val) === 'Date'
}

/**
 * 判断是否是数组
 * @param val
 */
export function isArray(val: any): any {
  return toRawType(val) === 'Array'
}

/**
 * 混合对象
 * @param to
 * @param from
 */
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objects: any[]): any {
  const result = Object.create(null)
  objects.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge({}, val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}
