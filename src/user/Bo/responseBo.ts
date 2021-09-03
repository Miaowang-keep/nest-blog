/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-05-28 10:30:01
 * @LastEditTime: 2021-06-13 09:05:12
 * @LastEditors: miaowang
 */
import { ApiProperty } from '@nestjs/swagger';
import { CheckUserNameDao } from '../Dto/checkUserNameDao';

export class ResponseBo extends CheckUserNameDao {
  @ApiProperty()
  msg: string;
  @ApiProperty()
  data: unknown;

  constructor(data: unknown, msg: string) {
    super();
    this.msg = msg;
    this.data = data;
  }
}
