import { Logger } from '../../utils/log4js';

export class CommonUserBo {
  userid: number;
  username: string;
  realname: string;
  phone: string;
  lockstate: string;
  userstate: string;

  constructor(user) {
    this.userid = user.userid;
    this.username = user.username;
    this.realname = user.realname;
    this.phone = user.phone;
    this.lockstate = user.lockstate == 0 ? '禁用' : '启用';
    this.userstate = user.userstate == 0 ? '禁用' : '启用';
  }
}
