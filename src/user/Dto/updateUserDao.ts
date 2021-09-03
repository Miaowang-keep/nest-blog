/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-05-27 14:24:28
 * @LastEditTime: 2021-06-21 15:31:53
 * @LastEditors: miaowang
 */
import { UserEntity } from '../Entity/studentEntity';
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

export class UpdateUserDto {
  @IsNotEmpty({ message: 'userid不能为空' })
  @ApiProperty()
  userid: number;

  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  readonly realname: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly lockstate: string;

  @ApiProperty()
  readonly userstate: string;

  @ApiProperty()
  readonly roleid: number;

  @ApiProperty()
  password_salt: string;
}
