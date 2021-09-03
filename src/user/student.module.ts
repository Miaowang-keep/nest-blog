/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-05-25 16:51:42
 * @LastEditTime: 2021-08-26 18:33:20
 * @LastEditors: miaowang
 */
import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entity/studentEntity';
import { UserRepository } from './student.providers';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
