import { createMap, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { BaseDto } from "../../common/base/base.dto";
import { BaseEntity } from "typeorm";
import { CityDto } from "./dto/city.dto";
import { CountyDto } from "./dto/county.dto";
import { City } from "./model/city.entity";
import { County } from "./model/county.entity";

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