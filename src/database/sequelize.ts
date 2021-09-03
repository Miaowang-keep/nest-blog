/*
 * @Author: miaowang
 * @Description:
 * @Date: 2021-05-25 16:15:27
 * @LastEditTime: 2021-08-24 09:40:13
 * @LastEditors: miaowang
 */
import { Sequelize } from 'sequelize-typescript';
import { RoleEntity } from '../role/Entity/roleEntity';
import { ConfigService } from '../shared/config/config.service';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize(configService.sequelizeOrmConfig);
      sequelize.addModels([]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
const configService = new ConfigService();

export const sequelize = new Sequelize(configService.sequelizeOrmConfig);

// 测试数据库链接
