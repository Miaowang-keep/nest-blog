import { BadRequestException, Injectable } from '@nestjs/common';

class connectParama {
  host?: string;
  port?: string;
  user: string;
  password: string;
}

class FileProperty {
  date: Date;
  name: string;
  size: number;
  type: string;
}
@Injectable()
export class FtpService {
  private ftpConnect: any;
  private fs: any;
  private path: any;
  constructor() {
    const ftp = require('ftp');
    this.ftpConnect = new ftp();
    this.fs = require('fs');
    this.path = require('path');
  }

  /**
   * @description 获取指定目录下的所有文件列表
   * @param params
   * @param path
   */
  getDirList(params: connectParama, path: string): Promise<FileProperty> {
    const ftp = require('ftp');
    this.ftpConnect = new ftp();
    return new Promise((resolve) => {
      this.ftpConnect.on('ready', () => {
        this.ftpConnect.list(path, (err, list: any) => {
          list.map((item: FileProperty) => {
            item.name = Buffer.from(item.name, 'binary').toString('utf8');
          });
          resolve(list);
          if (err) {
            throw new BadRequestException('文件服务器打开文件列表错误！');
          }
          this.ftpConnect.end();
        });
      });
      this.ftpConnect.connect(params);
    });
  }

  uploadFile(
    params: connectParama,
    uploadFilePath: string,
    savePath: string,
  ): Promise<string> {
    const ftp = require('ftp');
    this.ftpConnect = new ftp();
    return new Promise((resolve) => {
      this.ftpConnect.on('ready', () => {
        this.ftpConnect.put(uploadFilePath, savePath, (err) => {
          if (err) {
            console.log('err', err);
            resolve('上传失败');
            return;
          } else {
            resolve('上传成功');
            this.ftpConnect.end();
          }
        });
      });
      this.ftpConnect.connect(params);
    });
  }
}
