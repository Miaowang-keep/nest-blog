/*
 * @Author: miaowang
 * @Description:拦截器exception 拦截错误信息
 * @Date: 2021-06-18 10:19:27
 * @LastEditTime: 2021-06-21 14:47:49
 * @LastEditors: miaowang
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Response, Request } from 'express';
import { Logger } from 'src/utils/log4js';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    //上下文信息转化未http
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    Status code: ${status}
    Response: ${exception.toString()} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    `;
    Logger.info(logFormat);
    response.status(status).json({
      statusCode: status,
      error: exception.message,
      msg: this.transCodeToMessage(status),
    });
  }
  /**
   * @Author: miaowang
   * @description: 根据返回的code，转化指定的错误信息
   * @param  {*}
   * @return {*}
   * @param {number} code
   */
  transCodeToMessage(code: number): string {
    if (code === 401) {
      return '无权进行操作，请先登录！';
    }
  }
}
