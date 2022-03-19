/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-05-25 16:52:55
 * @LastEditTime: 2021-08-24 09:36:03
 * @LastEditors: miaowang
 */
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from './Entity/studentEntity';
import { CreateUser } from './Dto/createUserDao';
import { UserDto } from './Dto/student.dto';
import { createUserBo } from './Bo/createUserBo';
import { Response } from './Bo/Response';
import { sequelize } from '../database/sequelize';
import { makeSalt, encryptPassword } from '../utils/cryptogram';
import { UpdateUserDto } from './Dto/updateUserDao';
import { Logger } from 'src/utils/log4js';
import * as utils from '../share/utils';
import * as sqlUtils from '../share/sqlUtils';
import { UserRepository } from './student.providers';
import { getManager } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(private readonly userRepository: UserRepository) {}
  /**
   * @Author: miaowang
   * @description: 通过username查找用户是否存在
   * @param  username :string
   * @return Boolean
   * @param {string} username
   */
  async findByUsername(username: string): Promise<any | undefined> {
    try {
      return await this.userRepository.findByName(username);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createUser(createUser: CreateUser) {
    const user = await this.userRepository.findByName(createUser.username);
    if (user) {
      return new Response('用户名重复', null, 205);
    } else {
      try {
        const user = new UserEntity();
        user.username = createUser.username;
        user.realname = createUser.realname;
        user.phone = createUser.phone;
        user.lockstate = createUser.lockstate;
        user.userstate = createUser.userstate;
        const salt = makeSalt();
        user.password_salt = salt;
        user.password = encryptPassword(createUser.password, salt);
        const userList = await this.userRepository.save(user);
        return new Response('调用成功', new createUserBo(userList), 200);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
    }
  }
  /**
   * @Author: miaowang
   * @description: 更新用户信息
   * @param  {*}
   * @return {*}
   * @param {UpdateUserDto} updateUserDto
   */
  async updateUser(updateUserDto: UpdateUserDto) {
    const userid = updateUserDto.userid;
    Logger.info(userid);
    try {
      const userObject = await this.userRepository.findOne(userid);
      const user = JSON.stringify(userObject);
      if (utils.isEmptyObject(user)) {
        return new Response('更新失败，用户不存在！', null, 200);
      } else {
        delete updateUserDto.userid;
        const tempUpdateUserDto = Object.assign({}, updateUserDto);
        const salt = makeSalt();
        if (tempUpdateUserDto.password && tempUpdateUserDto.password != '') {
          tempUpdateUserDto.password_salt = salt;
          tempUpdateUserDto.password = encryptPassword(
            tempUpdateUserDto.password,
            salt,
          );
        }
        const res = await this.userRepository.save(tempUpdateUserDto);
        Logger.info('res');
        Logger.info(res);
        if (res) {
          const userResult = await this.userRepository.findOne(userid);
          return new Response('更新成功！', userResult, 200);
        } else {
        }
      }
    } catch (error) {}
  }
  /**
   * @Author: miaowang
   * @description: 删除单个用户信息
   * @param  {*}
   * @return {*}
   */
  async deleteUser(userid: string) {
    const userResult = await this.userRepository.findOne(userid);
    if (utils.isEmptyObject(userResult)) {
      return new Response('删除失败，无此用户!', null, 200);
    } else {
      await this.userRepository.remove(userResult);
      return new Response('删除成功！', null, 200);
    }
  }
  /**
   * @Author: miaowang
   * @description: 用户信息和权限信息的联合查询
   * @param  {*}
   * @return {*}
   * @param {string} userid
   */
  async findUserinfoAllById(userid: string) {
    //生成实体管理器  （做原生sql查询）
    const entityManager = getManager();
    let sql = '';
    sql = `SELECT
          u.userid,
          u.username,
          u.realname,
          u.phone,
          u.lockstate,
          u.userstate,
          t3.roleid,
          t3.roleName	
        FROM
          userinfo u
          LEFT JOIN ( SELECT t1.*, t2.userid FROM role t1, userrole t2 WHERE t1.roleid = t2.roleid ) t3 ON u.userid = t3.userid
          where u.userid =?`;
    const userObj = await entityManager.query(sql, [userid]);
    Logger.info('userObj');
    Logger.info(userObj);

    if (userObj) {
      return new Response('更新成功！', userObj, 200);
    } else {
    }
  }

  async findUserinfoById(userid: number) {
    return this.userRepository.findOne(userid);
  }
}
