import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuEntity } from './Entity/menuEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuRepository } from './Provider/menuProvider';

@Module({
  imports: [TypeOrmModule.forFeature([MenuRepository])],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
