import { createMap, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { BaseDto, BaseEntity } from "../../common/base";
import { Receiver, CargoLocation, Cargo } from "./model";
import { CreateCargoLocationDto, ReceiverCargoResponse, DriverCargoResponse, CreateCargoDto, CreateReceiverDto, CargoDto, CargoLocationDto, ReceiverDto } from "./dto";

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