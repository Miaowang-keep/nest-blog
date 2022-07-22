/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-05-25 16:11:07
 * @LastEditTime: 2021-07-27 20:04:36
 * @LastEditors: miaowang
 */
import { Dialect } from 'sequelize/types';

export const dbConfig = {
  mysql: {
    port: 3307,
    host: 'localhost',
    username: 'root',
    password: '123456',
    database: 'koa2', // 库名
    connectionLimit: 10, // 连接限制
    dialect: 'mysql' as Dialect,
    synchronize: false,
    define: {
      timestamps: false,
    },
    pool: {
      max: 10, // 连接池中最大连接数量
      min: 0, // 连接池中最小连接数量
      acquire: 30000,
      idle: 10000, // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    },
    models: [__dirname + '../src/role/Entity/roleEntity'],
    timezone: '+08:00', // 东八时区
  },
};
