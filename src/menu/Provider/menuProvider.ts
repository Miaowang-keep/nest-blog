/*
 * @Author: miaowang
 * @Description: 自定义用户存储库
 * @Date: 2021-05-26 17:15:54
 * @LastEditTime: 2021-08-26 18:42:02
 * @LastEditors: miaowang
 */
import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { MenuEntity } from '../Entity/menuEntity';

@Injectable()
@EntityRepository(MenuEntity)
export class MenuRepository extends Repository<MenuEntity> {
  async findMenuInfoByName(menuName: string) {
    return await this.createQueryBuilder('menu')
      .where('menu.menuName = :menuName', { menuName: menuName })
      .getOne();
  }
  async findMenuInfoList() {
    return await this.createQueryBuilder('menu').getMany();
  }
}
