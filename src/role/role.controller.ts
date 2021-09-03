/*
 * @Author: miaowang
 * @Description:权限管理路由api管理
 * @Date: 2021-07-04 17:21:14
 * @LastEditTime: 2021-07-20 17:39:28
 * @LastEditors: miaowang
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
import { RoleService } from './role.service';
import { ValidationPipe } from '../pipe/validation.pipe';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';
import { CreateRoleDao } from './Dto/createRoleDao';
import { UpdateRoleDao } from './Dto/updateRoleDao';
import { UserRoleDao } from './Dto/userRoleDao';
import { Response } from '../user/Bo/response';
@ApiTags('权限管理')
@ApiBearerAuth()
@Controller('role')
@UseInterceptors(TransformInterceptor)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('addRole')
  @ApiBody({
    description: '增加角色信息',
    type: CreateRoleDao,
  })
  @HttpCode(200)
  @ApiResponse({ type: [Response] })
  @UsePipes(ValidationPipe)
  createUser(@Body() createRoleDao: CreateRoleDao): Promise<Response> {
    return this.roleService.createRole(createRoleDao);
  }

  @Post('updateRole')
  @ApiBody({
    description: '修改角色信息',
    type: UpdateRoleDao,
  })
  @HttpCode(200)
  @ApiResponse({ type: [Response] })
  @UsePipes(ValidationPipe)
  updateUser(@Body() updateRoleDao: UpdateRoleDao): Promise<Response> {
    return this.roleService.updateRole(updateRoleDao);
  }

  @Delete(':roleid')
  @HttpCode(200)
  @ApiParam({ name: 'roleid', required: true })
  deleteRole(@Param('roleid') roleid: number): Promise<Response> {
    return this.roleService.deleteRole(roleid);
  }

  @Get(':roleid')
  @HttpCode(200)
  @ApiParam({ name: 'roleid', required: true })
  findRoleByid(@Param('roleid') roleid: number): Promise<Response> {
    return this.roleService.findRoleinfoByid(roleid);
  }

  @Post('userAuthorizeRole')
  @ApiBody({
    description: '给用户授权角色',
    type: UserRoleDao,
  })
  @HttpCode(200)
  @ApiResponse({ type: [Response] })
  @UsePipes(ValidationPipe)
  userAuthorizeRole(@Body() userRoleDao: UserRoleDao): Promise<Response> {
    return this.roleService.userAuthorizeRole(userRoleDao);
  }
}
