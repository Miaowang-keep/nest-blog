/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-07-04 17:20:56
 * @LastEditTime: 2021-08-10 16:42:57
 * @LastEditors: miaowang
 */
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleProviders } from './providers/role.providers';
import { DatabaseModule } from '../database/database.module';
import { StudentModule } from '../user/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './Entity/roleEntity';
import { PermissionModule } from '../permission/permission.module'
import { RoleUserEntity } from '../permission/Entity/userrole';

@Module({
  imports: [
    DatabaseModule,
    StudentModule,
    PermissionModule,
    TypeOrmModule.forFeature([RoleEntity, RoleUserEntity]),
  ],
  providers: [RoleService, ...RoleProviders],
  exports: [RoleService],
})
export class RoleModule {}
