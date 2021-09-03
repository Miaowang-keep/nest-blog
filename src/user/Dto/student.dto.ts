/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-05-26 17:29:14
 * @LastEditTime: 2021-08-10 16:05:37
 * @LastEditors: miaowang
 */
import { UserEntity } from '../Entity/studentEntity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  userid: number;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly realname: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly lockstate: string;

  @ApiProperty()
  readonly userstate: string;

  constructor(userEntity: UserEntity) {
    this.userid = userEntity.userid;
    this.username = userEntity.username;
    this.realname = userEntity.realname;
    this.phone = userEntity.phone;
    this.lockstate = userEntity.lockstate;
    this.userstate = userEntity.userstate;
  }
}
