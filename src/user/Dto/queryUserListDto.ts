import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class QueryUserListReq {
  @ApiProperty({ description: '用户名' })
  readonly username: string;

  @ApiProperty({ description: '姓名' })
  readonly realname: string;
}
