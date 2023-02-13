import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { CommonProfile } from './common.profile';
import { County, City } from './model';

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
