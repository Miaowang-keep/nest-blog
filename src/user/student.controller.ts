/*
 * @Description:用户路由api管理
 * @Author: miaowang
 * @Date: 2021-05-25 16:51:51
 * @LastEditTime: 2021-08-26 14:31:00
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
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { createUserBo } from './Bo/createUserBo';
import { Response } from './Bo/response';
import { UserDto } from './Dto/student.dto';
import { LoginDTO } from './Dto/userDao';
import { CreateUser } from './Dto/createUserDao';
import { UpdateUserDto } from './Dto/updateUserDao';
import { CheckUserNameDao } from './Dto/checkUserNameDao';
import { AuthService } from '../auth/auth.service';
import { StudentService } from './student.service';
import { ValidationPipe } from '../pipe/validation.pipe';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';

@ApiBearerAuth()
@ApiTags('用户信息表')
@Controller('user')
@UseInterceptors(TransformInterceptor)
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly authService: AuthService, // private readonly updateUserDto :UpdateUserDto
  ) {}
  @Post('login')
  @HttpCode(200)
  @ApiBody({
    description: '用户登录',
    type: LoginDTO,
  })
  @UsePipes(ValidationPipe)
  /**
   * @Author: miaowang
   * @description: 用户登录
   * @param  {*}
   * @return {*}
   */
  async login(@Body() loginDTO: LoginDTO) {
    const authResult = await this.authService.validateUser(
      loginDTO.username,
      loginDTO.password,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.data);
      case 2:
        return {
          data: {
            code: 600,
            msg: `账号或密码不正确`,
          },
        };
      default:
        return {
          data: {
            code: 600,
            msg: `查无此人`,
          },
        };
    }
  }

  /**
   * @Author: miaowang
   * @description: 添加用户信息
   * @param  {*}
   * @return {*}
   */
  // @UseGuards(AuthGuard('jwt'))
  @Post('addUser')
  @ApiBody({
    description: '增加用户信息',
    type: CreateUser,
  })
  @HttpCode(200)
  @ApiResponse({ type: createUserBo })
  @UsePipes(ValidationPipe)
  createUser(@Body() createUser: CreateUser): Promise<Response> {
    return this.studentService.createUser(createUser);
  }

  @ApiBody({
    description: '修改用户信息',
    type: UpdateUserDto,
  })
  //@UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Post('updateUser')
  updateUser(
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ): Promise<Response> {
    return this.studentService.updateUser(updateUserDto);
  }

  @Delete(':userid')
  //@UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  deleteUser(@Param('userid') userid: string): Promise<Response> {
    return this.studentService.deleteUser(userid);
  }

  @Get(':userid')
  @HttpCode(200)
  @ApiOkResponse({ type: [Response] })
  findUserById(@Param('userid') userid: string): Promise<Response> {
    return this.studentService.findUserinfoAllById(userid);
  }
}
