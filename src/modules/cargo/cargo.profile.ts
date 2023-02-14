import { createMap, forMember,  mapFrom, Mapper } from "@automapper/core";
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
            createMap(mapper, CreateCargoDto, Cargo, 
                forMember((dest) => dest.driverFullname, mapFrom((src) => src.driverFullname.toUpperCase())),
                forMember((dest) => dest.plateNo, mapFrom((src) => src.plateNo.toUpperCase())));
            createMap(mapper, Receiver, ReceiverDto);
            createMap(mapper, CreateReceiverDto, Receiver, 
                forMember((dest) => dest.receiverFullname.toUpperCase(), mapFrom((src) => src.receiverFullname.toUpperCase())));
            createMap(mapper, CargoLocation, CargoLocationDto);
            createMap(mapper, CreateCargoLocationDto, CargoLocation);
        }
    }
}