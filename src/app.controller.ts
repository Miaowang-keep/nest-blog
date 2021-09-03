/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-05-18 06:46:02
 * @LastEditTime: 2021-07-09 06:16:04
 * @LastEditors: miaowang
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  getHello(): string {
    return this.appService.getHello();
  }
}
