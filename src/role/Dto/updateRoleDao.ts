/*
 * @Author: miaowang
 * @Description:修改权限参数
 * @Date: 2021-07-05 18:55:37
 * @LastEditTime: 2021-07-20 14:14:30
 * @LastEditors: miaowang
 */
import { RoleEntity } from '../Entity/roleEntity';
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

export class UpdateRoleDao {
  @IsNotEmpty()
  @ApiProperty()
  roleid: number;

  @IsString()
  @ApiProperty()
  roleName: string;

  @IsString()
  @ApiProperty()
  roleFlag: string;

  @IsString()
  @ApiProperty()
  roleState: string;

  @ApiProperty()
  updateUserid: number;
}
