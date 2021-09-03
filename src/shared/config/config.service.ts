import { Injectable } from '@nestjs/common';
import { dbConfig } from '../../../config/db';

@Injectable()
export class ConfigService {
  get sequelizeOrmConfig() {
    return dbConfig.mysql;
  }
}
