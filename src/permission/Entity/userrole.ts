/**
 *@Author:miaowang
 *Description: 用户角色授权表 （userrole）
 *@Date: 2021-08-30 16:08:31
 *@LastEditTime: 2021-08-30 16:08:31
 */
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from '../../role/Entity/roleEntity';

@Entity('userrole')
export class RoleUserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  roleid: number;
  @Column()
  userid: number;
  @Column()
  createUserid: number;
  @ManyToOne(() => RoleEntity, (role) => role.roleid)
  role: RoleEntity;
}
