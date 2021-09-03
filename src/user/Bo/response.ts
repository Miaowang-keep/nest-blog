/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-06-01 17:44:29
 * @LastEditTime: 2021-06-13 09:05:28
 * @LastEditors: miaowang
 */

import { ApiProperty } from '@nestjs/swagger';

export class Response {
  @ApiProperty()
  msg: string;

  @ApiProperty()
  data: any;

  @ApiProperty()
  code: number;
  constructor(msg: string, data: any, code: number) {
    this.msg = msg;
    this.data = data;
    this.code = code;
  }
}
