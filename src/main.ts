/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-05-18 06:46:02
 * @LastEditTime: 2021-06-22 15:38:00
 * @LastEditors: miaowang
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { Logger } from 'src/utils/log4js';
import { ValidationPipe } from './pipe/validation.pipe';
import * as express from 'express';
import { logger } from './middleware/logger.middleware';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { FormatterDateInterceptor } from './interceptor/formatterDate.interceptor';
const { fork } = require('child_process');
const path = require('path');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  //加入日志中间件
  app.use(logger);
  //日志返回信息拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  //日志返回日期格式化
  app.useGlobalInterceptors(new FormatterDateInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('blog');

  app.enableCors(); //设置允许跨域
  const swaggerOptions = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(`个人博客API文档`)
    .setDescription(`个人博客API解释文档`)
    .setVersion(`1.0.0`)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
