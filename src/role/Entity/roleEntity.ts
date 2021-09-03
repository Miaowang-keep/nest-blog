/*
 * @Author: miaowang
 * @Description:role实体表
 * @Date: 2021-07-04 16:51:40
 * @LastEditTime: 2021-08-27 15:09:12
 * @LastEditors: miaowang
 */

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RoleUserEntity } from '../../permission/Entity/userrole';
@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  roleid: number;

  @Column()
  roleName: string;

  @Column()
  roleFlag: string;

  @Column()
  roleState: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  createUserid: number;

  @Column()
  updateUserid: number;

  @OneToMany(
    (type) => RoleUserEntity,
    (roleUserEntity) => roleUserEntity.roleid,
  )
  roleUserLists: RoleUserEntity[];
}
