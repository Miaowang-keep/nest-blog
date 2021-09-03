import { ApiProperty } from '@nestjs/swagger';

export class CheckUserNameDao {
  @ApiProperty()
  username: string;
}
