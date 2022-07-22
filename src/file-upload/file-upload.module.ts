import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './Entity/FileEntity';
import { FtpService } from './ftp.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [FileUploadController],
  providers: [FileUploadService, FtpService],
})
export class FileUploadModule {}
