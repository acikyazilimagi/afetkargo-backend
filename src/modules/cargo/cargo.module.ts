import { CargoService} from './cargo.service';
import { CargoController } from './cargo.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargoProfile, } from './cargo.profile';
import { Cargo } from './model/cargo.entity';
import { Receiver } from './model/receiver.entity';
import { CargoLocation } from './model/cargo-location.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature(
      [ 
        Cargo,
        Receiver,
        CargoLocation
      ])
  ],
  controllers: [CargoController],
  providers: [CargoService, CargoProfile,],
  exports: [CargoService, TypeOrmModule]
})
export class CargoModule {}
