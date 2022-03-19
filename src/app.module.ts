/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-05-18 06:46:02
 * @LastEditTime: 2021-08-20 11:38:23
 * @LastEditors: miaowang
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentController } from './user/student.controller';
import { RoleController } from './role/role.controller';
import { StudentModule } from './user/student.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../config/db';
import { PermissionModule } from './permission/permission.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: dbConfig.mysql.host,
      port: dbConfig.mysql.port,
      username: dbConfig.mysql.username,
      password: dbConfig.mysql.password,
      database: dbConfig.mysql.database,
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    StudentModule,
    SharedModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    MenuModule,
  ],
  controllers: [AppController, StudentController, RoleController],
  providers: [AppService],
})
export class AppModule {}
