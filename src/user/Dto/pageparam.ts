import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PageDto } from './pageDto';
import { QueryUserListReq } from './queryUserListDto';

export class queryUserListDto<QueryUserListReq> {
  @ApiProperty({ description: '分页参数' })
  @ValidateNested()
  @Type(() => PageDto)
  pageParam: PageDto;

  @ApiProperty({
    description: '分页查询用户搜索条件',
    type: QueryUserListReq,
  })
  @ValidateNested()
  @Type(() => QueryUserListReq)
  requestParamDto: QueryUserListReq;
}
