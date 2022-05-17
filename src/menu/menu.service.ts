import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from './Entity/menuEntity';
import { Repository, getManager } from 'typeorm';
import { RoleEntity } from '../role/Entity/roleEntity';
import { CreateMenuDto } from './Dto/createMenu';
import { MenuRepository } from './Provider/menuProvider';
import { Response } from '../user/Bo/response';
import { Logger } from '../utils/log4js';
import * as utils from '../share/utils';

@Injectable()
export class MenuService {
  constructor(
    // @InjectRepository(MenuEntity)
    private readonly menuRepository: MenuRepository,
  ) {}

  /**
   * @Author miaowang
   * @description 新增单条菜单信息
   * @param createMenu
   */
  async addMenu(createMenu: CreateMenuDto) {
    const menuInfo = await this.menuRepository.findMenuInfoByName(
      createMenu.menuName,
    );
    if (menuInfo) {
      return new Response('菜单名重复', {}, 205);
    } else {
      try {
        const saveResult = await this.menuRepository.save(
          Object.assign(new MenuEntity(), {
            menuName: createMenu.menuName,
            menuDesc: createMenu.menuDesc,
            url: createMenu.url,
            menuType: createMenu.menuType,
            pmenuid: createMenu.pmenuid,
            createUserid: createMenu.createUserid,
            order: createMenu.order,
            path: createMenu.path,
            menuState: createMenu.menuState,
          }),
        );
        return new Response('保存菜单成功', saveResult, 200);
      } catch (e) {
        Logger.info(e);
        throw new BadRequestException('添加失败');
      }
    }
  }

  /**
   * @description 根据menuid删除单个菜单
   * @param menuId
   */ x;
  async removeMenuById(menuId: number): Promise<Response> {
    const menuInfo = await this.menuRepository.findOne(menuId);
    if (!menuInfo) {
      return new Response('删除失败，无此菜单!', null, 200);
    } else {
      try {
        this.menuRepository.remove(menuInfo);
        return new Response('调用成功', {}, 200);
      } catch (e) {
        Logger.error(e);
        throw new BadRequestException('删除失败');
      }
    }
  }

  /**
   * @description 查树形
   * @param menuId
   */
  async buildMenu(userid: number) {
    const sql = `select * from menu m
                     where m.menuid in (
                     SELECT menuid FROM rolemenu WHERE roleid IN ( 
                       SELECT ur.roleid FROM userrole ur WHERE ur.userid = ?
                       )
                     )`;
    const menuList = await getManager().query(sql, [userid]);
    const menuTree = [];
    /*    try {
      menuTree = utils.listToTree_NoPid(menuList, 'menuid', 'pmenuid');
    } catch (e) {
      throw e;
    }*/

    return new Response('调用成功', menuList, 200);
  }
}
