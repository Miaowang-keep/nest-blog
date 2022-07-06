/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-06-13 09:52:15
 * @LastEditTime: 2021-06-13 15:06:16
 * @LastEditors: miaowang
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../utils/log4js';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const code = res.statusCode; //设置响应码
    next();
  }
}

// 函数式中间件
export function logger(req: Request, res: Response, next: () => any) {
  const code = res.statusCode;
  next();
  const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${code}
    Parmas: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(
      req.body,
    )} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `;
  if (code >= 500) {
    Logger.error(logFormat);
  } else if (code >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.access(logFormat);
    Logger.log(logFormat);
  }
}
