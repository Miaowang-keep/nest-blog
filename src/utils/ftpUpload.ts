import { Logger } from './log4js';

const ftp = require('ftp');

export class FtpUpload {
  host: string;
  port: string;
  user: string;
  password: string;
  ftpClient; // ftp实例
  constructor(ftpParams) {
    const { host, port, user, password } = ftpParams;
    this.host = host;
    this.port = port;
    this.user = user;
    this.password = password;
    this.ftpClient = new ftp();
  }

  /**
   * @description ftp连接建立
   */
  connect(): void {
    this.ftpClient.connect({
      host: this.host,
      port: this.port,
      user: this.user,
      password: this.password,
    });
  }

  /**
   * @description 切换目录
   * @param dirpath
   */
  cwd(dirpath) {
    return new Promise((resolve, reject) => {
      this.ftpClient.cwd(dirpath, (err, dir) => {
        resolve({ dir: dir });
      });
    });
  }

  async list() {
    //   await this.cwd(dirpath);
    return new Promise((resolve) => {
      console.log('this.ftpClient', this.ftpClient);
      this.ftpClient.list((err, files) => {
        console.log('err', err);
      });
      /*      this.ftpClient.list((err, files) => {
        resolve({ err, files });
      });*/
    });
  }
}
