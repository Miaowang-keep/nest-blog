/*
 * @Author: miaowang
 * @Description:角色用户关联参数
 * @Date: 2021-07-20 17:31:27
 * @LastEditTime: 2021-07-20 17:34:01
 * @LastEditors: miaowang
 */

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsISO8601,
  IsOptional,
  MinLength,
  isNumber,
} from 'class-validator';

export class UserRoleDao {
  @IsNotEmpty()
  @ApiProperty()
  userid: number;

  @IsNotEmpty()
  @ApiProperty()
  roleid: number;

  @IsNotEmpty()
  @ApiProperty()
  createUserid: number;
}
