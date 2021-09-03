/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-05-31 18:28:34
 * @LastEditTime: 2021-08-24 09:39:16
 * @LastEditors: miaowang
 */
import { Injectable } from '@nestjs/common';
import { StudentService } from '../user/student.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../utils/cryptogram';

@Injectable()
export class AuthService {
  constructor(
    private readonly studentService: StudentService,
    private readonly jwtService: JwtService,
  ) {}
  /**
   * @Author: miaowang
   * @description: JWT校验用户名密码是否正确
   * @return {*}
   * @param {string} username
   * @param {string} password
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.studentService.findByUsername(username);
    if (user) {
      const hashedPs = user.password;
      const salt = user.password_salt;
      const nowPs = encryptPassword(password, salt);
      if (nowPs === hashedPs) {
        //密码校验
        return {
          code: 1,
          data: user,
        };
      } else {
        return {
          code: 2,
          data: null,
        };
      }
    } else {
      return {
        code: 2,
        data: null,
      };
    }
  }
  /**
   * @Author: miaowang
   * @description: jwt签证，生成token
   * @param  {*}
   * @return {*}
   * @param {any} user
   */
  async certificate(user: any) {
    const payload = {
      username: user.username,
      sub: user.userid,
      realName: user.realName,
      role: user.roleid,
    };
    try {
      const token = this.jwtService.sign(payload);
      const resultUserInfo = await this.studentService.findUserinfoById(
        payload.sub,
      );
      return {
        code: 200,
        data: {
          token,
          resultUserInfo: resultUserInfo,
        },
        msg: `登录成功`,
      };
    } catch (error) {
      return {
        code: 600,
        msg: `账号或密码错误`,
      };
    }
  }
}
