import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonProfile } from './common.profile';
import { County } from './model/county.entity';
import { City } from './model/city.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [ 
        City,
        County
      ])
  ],
  controllers: [CommonController],
  providers: [CommonService, CommonProfile,],
  exports: [CommonService, TypeOrmModule]
})
export class CommonModule {}
