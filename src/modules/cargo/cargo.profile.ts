import { createMap, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { BaseDto } from "../../common/base/base.dto";
import { BaseEntity } from "typeorm";
import { Cargo } from "./model/cargo.entity";
import { CargoDto } from "./dto/cargo.dto";
import { CargoLocation } from "./model/cargo-location.entity";
import { CargoLocationDto } from "./dto/cargoLocation.dto";
import { Receiver } from "./model/receiver.entity";
import { ReceiverDto } from "./dto/receiver.dto";
import { CreateReceiverDto } from "./dto/createReceiver.dto";
import { CreateCargoDto } from "./dto/createCargo.dto";
import { DriverCargoResponse  } from "./dto/driverCargoResponse.dto";
import { ReceiverCargoResponse } from "./dto/receiverCargoResponse.dto";
import { CreateCargoLocationDto } from "./dto/createCargoLocation.dto";

@Injectable()
export class CargoProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, BaseEntity, BaseDto);
            createMap(mapper, Cargo, CargoDto);
            createMap(mapper, Cargo, DriverCargoResponse);
            createMap(mapper, Cargo, ReceiverCargoResponse);
            createMap(mapper, CreateCargoDto, Cargo);
            createMap(mapper, Receiver, ReceiverDto);
            createMap(mapper, CreateReceiverDto, Receiver);
            createMap(mapper, CargoLocation, CargoLocationDto);
            createMap(mapper, CreateCargoLocationDto, CargoLocation);
        }
    }
}