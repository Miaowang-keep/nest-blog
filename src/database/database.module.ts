import { Module } from '@nestjs/common';
import { databaseProviders } from './sequelize';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
