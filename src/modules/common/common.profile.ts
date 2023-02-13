import { createMap, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { BaseEntity } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseDto } from "../../common/base/base.dto";
import { CityDto, CountyDto } from "./dto";
import { City, County } from "./model";

@Injectable()
export class CommonProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, BaseEntity, BaseDto);
            createMap(mapper, City, CityDto);
            createMap(mapper, County, CountyDto);
        }
    }
}