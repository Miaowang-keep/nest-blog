/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-07-04 17:21:42
 * @LastEditTime: 2021-08-26 18:34:11
 * @LastEditors: miaowang
 */

import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { CreateRoleDao } from './Dto/createRoleDao';
import { UpdateRoleDao } from './Dto/updateRoleDao';
import { CreateRoleBo } from './Bo/createRoleBo';
import { Response } from '../user/Bo/response';
import { RoleEntity } from './Entity/roleEntity';
import { RoleUserEntity } from '../permission/Entity/userrole';
import { sequelize } from '../database/sequelize';
import { UserRoleDao } from './Dto/userRoleDao';
const { QueryTypes } = require('sequelize');
import { StudentService } from '../user/student.service';
import * as utils from '../share/utils';
import * as sqlUtils from '../share/sqlUtils';
import { Logger } from 'src/utils/log4js';
import { getManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmptyObject } from '../share/utils';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly studentService: StudentService,
  ) {}

  /**
   * @description 判断角色名称是否重复
   * @param rolename
   */
  async findRoleByNameUseSql(rolename: string) {
    const roles = await getManager()
      .createQueryBuilder(RoleEntity, 'role')
      .where('role.rolename =:rolename ', { rolename: rolename })
      .printSql()
      .getOne();
    return utils.isEmptyObject(roles);
  }

  /**
   * @创建角色信息
   * @param createRoleDao
   */
  async createRole(createRoleDao: CreateRoleDao) {
    if (createRoleDao && createRoleDao.roleName) {
      const roles = this.findRoleByNameUseSql(createRoleDao.roleName);
      if (!roles) {
        return new Response('角色名称不能重复', null, 200);
      } else {
        try {
          this.roleRepository.save(
            Object.assign(new RoleEntity(), {
              roleName: createRoleDao.roleName,
              roleFlag: createRoleDao.roleFlag,
              roleState: createRoleDao.roleState,
              createUserid: createRoleDao.createUserid,
            }),
          );
        } catch (e) {
          Logger.info(e);
          throw new BadRequestException('添加失败');
        }
      }
    }
  }

  /**
   * @description 通过roleId查询角色信息
   * @param roleid
   */
  async findRoleByid(roleid: number) {
    Logger.info('角色信息');
    Logger.info(this.roleRepository.findOne(roleid));
    return this.roleRepository.findOne(roleid);
  }

  /**
   * @description 更新角色信息
   * @param updateRoleDao
   */
  async updateRole(updateRoleDao: UpdateRoleDao) {
    const roleObject = await this.findRoleByid(updateRoleDao.roleid);
    if (utils.isUndef(roleObject)) {
      return new Response('更新失败，角色不存在！', null, 200);
    } else {
      await this.roleRepository.save(
        Object.assign({}, roleObject, {
          roleName: roleObject.roleName,
          roleFlag: roleObject.roleFlag,
          roleState: roleObject.roleState,
          updateUserid: roleObject.updateUserid,
        }),
      );
    }
  }

  /**
   * @description 删除角色
   * @param roleid
   */
  async deleteRole(roleid: number) {
    const roleObject = await this.findRoleByid(roleid);
    if (utils.isUndef(roleObject)) {
      return new Response('删除失败，角色不存在！', null, 200);
    } else {
      //删除之前去判断关联表里面有没有这个角色的数据
    }
  }
  async findRoleinfoByid(roleid: number) {
    const roleObject = await this.findRoleByid(roleid);
    if (utils.isUndef(roleObject)) {
      return new Response('角色不存在！', null, 200);
    } else {
      return new Response('调用成功', roleObject, 200);
    }
  }

  async userAuthorizeRole(userRoleDao: UserRoleDao) {
    //判断有没有这个用户
    try {
      const userObject = await this.studentService.findUserinfoById(
        userRoleDao.userid,
      );
      if (utils.isUndef(userObject)) {
        return new Response('用户不存在', null, 200);
      }
    } catch (error) {}
    const roleObject = await this.findRoleByid(userRoleDao.roleid);
    if (utils.isUndef(roleObject)) {
      return new Response('角色不存在！', null, 200);
    }
    const roleUserEntity = new RoleUserEntity();
    const tempSqlResult = sqlUtils.dynasticInsert('userrole', userRoleDao);
    const roleList = await sequelize.query(tempSqlResult.sql, {
      replacements: tempSqlResult.replaceParams,
      type: QueryTypes.INSERT,
      raw: true,
      logging: true,
    });
    Logger.info(roleList);
    return new Response('调用成功', null, 200);
  }
}
