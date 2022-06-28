import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PageDto } from './pageDto';
export class queryUserListDto {
  @ApiProperty({ description: '分页参数' })
  @ValidateNested()
  @Type(() => PageDto)
  pageParam: PageDto;

  @IsNotEmpty({ message: '用户名不为空' })
  readonly username: string;

  readonly realname: string;
}
