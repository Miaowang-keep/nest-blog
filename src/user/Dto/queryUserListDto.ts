import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class queryUserListDto {
  @IsNotEmpty({ message: '用户名不为空' })
  @ApiProperty({ description: '用户名' })
  readonly username: string;
  @ApiProperty({ description: '姓名' })
  readonly realname: string;
}
