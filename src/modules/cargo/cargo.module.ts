import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargoService} from './cargo.service';
import { CargoController } from './cargo.controller';
import { CargoProfile, } from './cargo.profile';
import { CargoLocation, Receiver, Cargo } from './model';
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
