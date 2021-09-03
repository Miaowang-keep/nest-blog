/*
 * @Author: miaowang
 * @Description: 常用工具函数
 * @Date: 2021-06-18 16:22:13
 * @LastEditTime: 2021-07-15 15:50:14
 * @LastEditors: miaowang
 */

/**
 * @Author: miaowang
 * @description: 判断一个值是否是undefined 或者 null
 * @param  {*}
 * @return {*}
 * @param {any} v
 */
export function isUndef(v: any): boolean {
  return v === undefined || v === null;
}
/**
 * @Author: miaowang
 * @description: 创建一个空对象
 * @param  {*}
 * @return {*}
 */
export const emptyObject = Object.freeze({});

/**
 * @Author: miaowang
 * @description: 判断一个变量是否是对象
 * @param  {*}
 * @return {*} true；Object
 * @param {unknown} obj
 */
export function isObject(obj: unknown): boolean {
  return obj !== null && typeof obj === 'object';
}

const _toString = Object.prototype.toString;

/**
 * @Author: miaowang
 * @description: 检查 obj 是否是普通对象。 也就是说该对象由 Object 构造函数创建或者 [[Prototype]] 为空。
 * @param  {*}
 * @return {*}
 * @param {Object} obj
 */

/* 
  function Foo() {
    this.a = 1;
   }
   isPlainObject( new Foo() )  => false  

   isPlainObject([1, 2, 3]);   => false

   isPlainObject({ 'x': 0, 'y': 0 });  => true

   isPlainObject(Object.create(null)); => true
*/
export function isPlainObject(obj: any): boolean {
  return _toString.call(obj) === '[object Object]';
}

/**
 * @Author: miaowang
 * @description: 判断一个普通的obj是否是空对象
 * @param  {*}
 * @return {*}
 * @param {Object} obj
 */
export function isEmptyObject(obj: any): boolean {
  //检查是否是普通对象，如果不是直接返回 false
  if (!isPlainObject(obj)) {
    return false;
  }
  if (isUndef(obj)) {
    return true;
  }
  return Object.keys(obj).length === 0;
}
