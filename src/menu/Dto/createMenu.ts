import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsISO8601,
  IsOptional,
  MinLength,
  isNumber,
} from 'class-validator';
import { Column } from 'typeorm';

export class CreateMenuDto {
  @ApiProperty()
  pmenuid: number;

  @IsString()
  @ApiProperty()
  url: string;

  @ApiProperty()
  order: number;

  @IsString()
  @ApiProperty()
  menuType: string;

  @IsString()
  @ApiProperty()
  menuDesc: string;

  @IsString()
  @IsNotEmpty({ message: '菜单名称不能为空' })
  @ApiProperty()
  menuName: string;

  @IsNotEmpty({ message: '创建人ID不能为空' })
  @ApiProperty()
  createUserid: number;

  @IsString()
  @ApiProperty()
  path: string;

  @IsString()
  @ApiProperty()
  menuState: string;
}
