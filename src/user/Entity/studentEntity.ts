/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-05-25 17:22:57
 * @LastEditTime: 2021-08-23 15:10:11
 * @LastEditors: miaowang
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RoleUserEntity } from '../../permission/Entity/userrole';

@Entity('userinfo')
export class UserEntity {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column()
  username: string;

  @Column()
  realname: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  lockstate: string;

  @Column()
  userstate: string;

  @Column()
  password_salt: string;

  @OneToMany((type) => RoleUserEntity, (roleUserEntity) => roleUserEntity.user)
  roleUserLists: RoleUserEntity[];
}
