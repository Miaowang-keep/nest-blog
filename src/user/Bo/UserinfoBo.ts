/**
 *@Author:miaowang
 *Description: 返回用户信息
 *@Date: 2021-09-30 16:09:23
 *@LastEditTime: 2021-09-30 16:09:23
 */

export class UserinfoBo {
  constructor(
    {
      userid = 0,
      username = '',
      rolename = '',
      phone = '',
      lockstate = '',
      userstate = '',
    } = {
      userid: 0,
      username: '',
      rolename: '',
      phone: '',
      lockstate: '',
      userstate: '',
    },
  ) {
    this.userid = userid;
    this.username = username;
    this.rolename = rolename;
    this.phone = phone;
    this.lockstate = lockstate;
    this.userstate = userstate;
  }
  userid: number;
  username: string;
  rolename: string;
  phone: string;
  lockstate: string;
  userstate: string;
}
