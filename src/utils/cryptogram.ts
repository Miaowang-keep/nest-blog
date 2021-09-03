/*
 * @Author: miaowang
 * @Description: 工具函数： 加密 & 解密
 * @Date: 2021-05-31 12:41:49
 * @LastEditTime: 2021-06-01 16:49:50
 * @LastEditors: miaowang
 */

import * as crypto from 'crypto';

/**
 * @Author: miaowang
 * @description: 生成密码盐
 * @param  {*}
 * @return {*}
 */
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}
/**
 * @Author: miaowang
 * @description:
 * @param {string} password 解密前的密码
 * @param {string} salt 密码盐
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  // const tempSalt = Buffer.from(salt,'base64')

  return crypto
    .pbkdf2Sync(password, salt, 10000, 16, 'sha1')
    .toString('base64');
}
