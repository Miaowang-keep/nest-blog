import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '../utils/log4js';

/**
 * @author miaowang
 * @description 格式化拦截器
 */
@Injectable()
export class FormatterDateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        if (data.data) {
          for (const key in data.data) {
            if (
              Object.prototype.toString.call(data.data[key]) === '[object Date]'
            ) {
              data.data[key] = this.transformTimestamp(data.data[key]);
            }
          }
        }
        return data;
      }),
    );
  }

  /**
   * @description 将日期转化为统一的字符串格式
   * @param timestamp
   */
  transformTimestamp(timestamp) {
    const a = new Date(timestamp).getTime();
    const date = new Date(a);
    const Y = date.getFullYear() + '-';
    const M =
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) + '-';
    const D =
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '  ';
    const h =
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    const m =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    // const s = date.getSeconds(); // 秒
    const dateString = Y + M + D + h + m;
    // console.log('dateString', dateString); // > dateString 2021-07-06 14:23
    return dateString;
  }
}
