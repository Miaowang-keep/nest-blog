import { IsNotEmpty } from 'class-validator';

export class UploadFinished {
  @IsNotEmpty({ message: '参数不能为空' })
  close: string;
  fileName: string;
  size: number;
  fileSize: number;
  fileUploadUser: number;
}
