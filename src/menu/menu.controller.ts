/**
 *@Author:miaowang
 *Description:菜单管理路由api管理
 *@Date: 2022-02-13 15:02:54
 *@LastEditTime: 2022-02-13 15:02:54
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  HttpCode,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ValidationPipe } from '../pipe/validation.pipe';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';
import { Response } from '../user/Bo/response';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './Dto/createMenu';
import { CreateRoleDao } from '../role/Dto/createRoleDao';
import * as Path from 'path';

@ApiTags('菜单管理')
@ApiBearerAuth()
@Controller('menu')
@UseInterceptors(TransformInterceptor)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('addMenu')
  @ApiBody({
    description: '新增菜单信息',
    type: CreateMenuDto,
  })
  @HttpCode(200)
  @ApiResponse({ type: [Response] })
  @UsePipes(ValidationPipe)
  /*  createUser(@Body() createRoleDao: CreateRoleDao): Promise<Response> {
    return this.menuService.addMenu(createRoleDao);
  }*/
  createUser(@Body() createMenuDto: CreateMenuDto): Promise<Response> {
    return this.menuService.addMenu(createMenuDto);
  }

  @Delete(':menuid')
  @HttpCode(200)
  @ApiResponse({ type: [Response] })
  deleteMenu(@Param('menuid') menuid: number): Promise<Response> {
    return this.menuService.removeMenuById(menuid);
  }

  @Get(':userid')
  @HttpCode(200)
  @ApiOkResponse({ type: [Response] })
  getMenuListByUserid(@Param('userid') userid: number): Promise<Response> {
    return this.menuService.buildMenu(userid);
  }
}
