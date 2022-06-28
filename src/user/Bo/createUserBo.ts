/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-05-27 15:31:55
 * @LastEditTime: 2021-06-13 09:01:40
 * @LastEditors: miaowang
 */
import { UserDto } from '../Dto/student.dto';
import { UserEntity } from '../Entity/studentEntity';

export class createUserBo extends UserDto {
  constructor(user: any) {
    super(user);
  }
}
