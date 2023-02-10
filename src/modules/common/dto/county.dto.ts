 import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { CityDto } from "./city.dto";

export class CountyDto {

    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    name: string;

    @ApiProperty()
    @AutoMap()
    city: CityDto;
}