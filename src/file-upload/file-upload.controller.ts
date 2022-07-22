import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadParams } from './Dto/uploadParams';
import { UploadFinished } from './Dto/uploadFinished';

@ApiBearerAuth()
@Controller('fileUpload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  /**
   * @ 大文件分片上传
   * @param uploadParams 携带参数
   * @param files  切片Blob
   */
  @Post('BigfileUpload')
  @UseInterceptors(FileInterceptor('Chunk'))
  commonFileUpload(@Body() uploadParams: UploadParams, @UploadedFile() files) {
    return this.fileUploadService.commonFileUpload(uploadParams, files);
  }

  /**
   * @ 文件上传结束接口
   * @param uploadFinished
   */
  @Post('bigfileuploadFinished')
  uploadFinished(@Body() uploadFinished: UploadFinished) {
    return this.fileUploadService.updaloadFinished(uploadFinished);
  }
}
