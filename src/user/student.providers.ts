/*
 * @Author: miaowang
 * @Description: 自定义用户存储库
 * @Date: 2021-05-26 17:15:54
 * @LastEditTime: 2021-08-26 18:42:02
 * @LastEditors: miaowang
 */
import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './Entity/studentEntity';

@Injectable()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findByName(userName: string) {
    return await this.createQueryBuilder('userinfo')
      .where('userinfo.username =:username', { username: userName })
      .getOne();
  }
}
