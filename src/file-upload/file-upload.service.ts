/*
 * @Author: miaowang
 * @Description:
 * @Date: 2022-07-06 17:53:22
 * @LastEditTime: 2022-07-15 10:28:11
 * @LastEditors: miaowang
 */
import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadParams } from '../file-upload/Dto/uploadParams';
import { Response } from '../user/Bo/response';
import { UploadFinished } from './Dto/uploadFinished';
import { InjectRepository } from '@nestjs/typeorm';
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const fsPromise = fs.promises;
import { FileEntity } from './Entity/FileEntity';
import { Repository } from 'typeorm';
import { FtpUpload } from '../utils/ftpUpload';
import { FtpService } from './ftp.service';

const ftp = require('ftp');

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(FileEntity)
    private FileRepository: Repository<FileEntity>,
    private ftpService: FtpService,
  ) {}

  /**
   * @description 接收大文件分片
   * @param uploadParam
   * @param file
   * @returns
   */
  async commonFileUpload(uploadParam: UploadParams, file) {
    const { name, fileName, chunkSize } = uploadParam;

    const fileBuffer = file.buffer;
    const baseFilePath = path.resolve(__dirname, '..', 'tempFilePath');
    const chunkDir = path.resolve(baseFilePath, `${fileName.split('.')[0]}`);
    const isexists = fs.existsSync(chunkDir);
    if (!isexists) {
      await fse.mkdirs(`${chunkDir}`);
    }
    await fse.outputFile(`${chunkDir}/${name}`, fileBuffer);

    return new Response('调用成功', null, 200);
  }

  /**
   * @description 合并切片
   * @param uploadFinished
   * @returns
   */

  async updaloadFinished(uploadFinished: UploadFinished) {
    const { close, fileName, size, fileSize, fileUploadUser } = uploadFinished;
    const pipeStream = (path: string, writeStream) => {
      return new Promise((resolve) => {
        const reader = fse.createReadStream(path, {
          highWaterMark: 1024 * 512,
        });
        reader.on('end', () => {
          fse.unlinkSync(path);
          resolve('end');
        });
        reader.pipe(writeStream);
      });
    };
    const tempDir = path.resolve(__dirname, '..', 'tempFilePath');
    const chunkDir = path.resolve(
      __dirname,
      '..',
      'tempFilePath',
      `${fileName.split('.')[0]}`,
    );
    if (close) {
      const readdirSyncList = fs.readdirSync(chunkDir);
      const hash = readdirSyncList[0].split('_')[0];
      const list = readdirSyncList.map((item) => {
        const writeStream = fse.createWriteStream(
          path.join(__dirname, `..`, fileName),
          {
            start: Number(item.split('_')[1]) * size,
          },
        );
        const ress = pipeStream(
          path.resolve(chunkDir, item),
          fse.createWriteStream(path.join(__dirname, `..`, fileName), {
            start: Number(item.split('_')[1]) * size,
          }),
        );
        return ress;
      });
      try {
        await Promise.all(list);
        fse.rmdirSync(chunkDir);
        fse.rmdirSync(tempDir);
      } catch (e) {
        throw new BadRequestException('文件合并失败');
      }

      const fileEntity = new FileEntity();
      fileEntity.fileId = hash;
      fileEntity.fileSize = fileSize;
      fileEntity.fileUploadUser = Number(fileUploadUser);
      fileEntity.fileName = fileName;
      try {
        await this.FileRepository.save(fileEntity);
      } catch (e) {
        throw new BadRequestException('插入文件维护表失败！');
      }
      await this.ftpUpload();
      return new Response('调用成功', null, 200);
    }
  }

  async ftpUpload() {
    const upLoadFilePath = path.join(__dirname, '..', '1.txt');
    this.ftpService
      .getDirList(
        {
          host: '172.17.203.40',
          port: '21',
          user: 'wang',
          password: 'wang',
        },
        '/home/ftp/ftpMiao',
      )
      .then((response) => {
        console.log(response);
      });
  }
}
