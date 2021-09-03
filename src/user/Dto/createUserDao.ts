/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-05-27 14:24:28
 * @LastEditTime: 2021-08-10 16:02:43
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

export class CreateUser {
  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  readonly realname: string;

  @IsString()
  @ApiProperty()
  readonly password: string;

  @IsString()
  @ApiProperty()
  readonly phone: string;

  @IsString()
  @ApiProperty()
  readonly lockstate: string;

  @IsString()
  @ApiProperty()
  readonly userstate: string;
}
