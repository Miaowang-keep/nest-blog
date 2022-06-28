import { IsInt, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
export class PageDto {
  @IsNotEmpty({ message: '每页数量不能为空' })
  @IsInt()
  pageSize: number;
  @IsNotEmpty({ message: '页码不能为空' })
  @IsInt()
  pageIndex: number;
}
