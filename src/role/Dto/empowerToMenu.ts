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
  ArrayNotEmpty,
} from 'class-validator';
export class EmpowerToMenu {
  @IsNotEmpty()
  @ApiProperty()
  roleid: number;

  @ApiProperty()
  menuIdList: Array<number>;
}
