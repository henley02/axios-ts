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
