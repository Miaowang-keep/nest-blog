/*
 * @Author: miaowang
 * @Description:,class-validation 管道验证
 * @Date: 2021-06-13 21:35:42
 * @LastEditTime: 2021-06-15 16:55:19
 * @LastEditors: miaowang
 */
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { Logger } from 'src/utils/log4js';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import * as utils from '../share/utils';

/*
 ArgumentMetadata 接口中包含三个参数：
   type：参数放在请求的位置 eg:body,param 等
   metatype: 属性的元类型，例如String。 如果在函数签名中省略类型声明，或者使用原生 JavaScript，则为undefined。
   data: 传递给装饰器的字符串
*/
@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    //将普通对象转化为指定的类的实例
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors && errors.length > 0) {
      const msg = this.formatterErrorMsg(errors);
      Logger.info(msg);

      // const msg = Object.values(errors[0].constraints)[0];
      // Logger.error(`Validation failed: ${msg}`);
      throw new BadRequestException(`Validation failed: ${msg}`);
    }
    return value;
  }

  /**
   * @description 格式化validation的参数校验错误错误
   * @param errorLists
   * @return string
   */
  formatterErrorMsg(errorLists: Array<any>): string {
    let result = '';
    if (errorLists && errorLists.length) {
      errorLists.forEach((errorList) => {
        const msgArray = errorList.children;
        if (
          errorList.constraints &&
          !utils.isEmptyObject(errorList.constraints)
        ) {
          result += `${Object.values(errorList.constraints)}  `;
        }

        if (msgArray && msgArray.length > 0) {
          msgArray.forEach((item) => {
            result += `${Object.values(item.constraints)}  `;
          });
        }
      });
    } else {
      throw new Error('arguments is empty Array');
    }
    return result;
  }

  /**
   * @description 类型判断
   * @param data
   * @private
   */
  private toValidate(data: any): boolean {
    const type: any[] = [String, Boolean, Number, Array, Object];
    return !type.includes(data);
  }
}
