import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PageDto } from './pageDto';
import { QueryUserListReq } from './queryUserListDto';

export class queryUserListDto<T> {
  @ApiProperty({ description: '分页参数' })
  @IsNotEmpty({ message: '分页参数不能为空' })
  @ValidateNested()
  @Type(() => PageDto)
  pageParam: PageDto;

  @ApiProperty({
    description: '分页查询用户搜索条件',
    type: QueryUserListReq,
  })
  @IsNotEmpty({ message: 'requestParamDto' })
  @ValidateNested()
  @Type(() => QueryUserListReq)
  requestParamDto: T;
}
