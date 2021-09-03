/*
 * @Author: miaowang
 * @Description:返回角色信息
 * @Date: 2021-07-05 19:38:44
 * @LastEditTime: 2021-07-08 11:11:10
 * @LastEditors: miaowang
 */
import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from '../Entity/roleEntity';

export class CreateRoleBo {
  @ApiProperty()
  roleid: number;

  @ApiProperty()
  roleName: string;

  @ApiProperty()
  roleFlag: string;

  @ApiProperty()
  roleState: string;

  @ApiProperty()
  createUserid: number;

  @ApiProperty()
  updateUserid: number;

  @ApiProperty()
  createTime: Date;

  @ApiProperty()
  updateTime: Date;

  constructor(roleEntity: RoleEntity) {
    this.roleid = roleEntity.roleid;
    this.roleName = roleEntity.roleName;
    this.roleFlag = roleEntity.roleFlag;
    this.roleState = roleEntity.roleState;
    this.createUserid = roleEntity.createUserid;
    this.updateUserid = roleEntity.updateUserid;
    this.createTime = roleEntity.createdAt;
    this.updateTime = roleEntity.updatedAt;
  }
}
