/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-07-04 17:03:52
 * @LastEditTime: 2021-07-19 15:32:28
 * @LastEditors: miaowang
 */
import { RoleEntity } from '../Entity/RoleEntity';

export const RoleProviders = [
  { provide: 'RoleRepository', useValue: RoleEntity },
];
