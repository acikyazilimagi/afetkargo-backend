import { createMap, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { BaseDto } from "../../common/base/base.dto";
import { BaseEntity } from "typeorm";
import { Cargo } from "./model/cargo.entity";
import { CargoDto } from "./dto/cargo.dto";
import { Receiver } from "./model/receiver.entity";
import { ReceiverDto } from "./dto/receiver.dto";

@Injectable()
export class CargoProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, BaseEntity, BaseDto);
            createMap(mapper, Cargo, CargoDto);
            createMap(mapper, CargoDto, Cargo);
            createMap(mapper, Receiver, ReceiverDto);
            createMap(mapper, ReceiverDto, Receiver);
        }
    }
}