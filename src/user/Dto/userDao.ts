/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-06-01 10:43:32
 * @LastEditTime: 2021-06-01 10:51:09
 * @LastEditors: miaowang
 */

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({ description: '用户名', example: 'koa2' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;
  @ApiProperty({ description: '密码', example: 'a123456' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}
