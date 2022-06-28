import { IsInt, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class PageDto {
  @IsNotEmpty({ message: '每页数量不能为空' })
  @IsInt()
  @ApiProperty({ description: '每页数量', example: 10 })
  pageSize: number;

  @IsNotEmpty({ message: '页码不能为空' })
  @IsInt()
  @ApiProperty({ description: '页码', example: 1 })
  pageIndex: number;
}
