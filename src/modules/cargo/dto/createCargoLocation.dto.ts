import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsLatitude, IsLongitude } from "class-validator";

export class CreateCargoLocationDto {
    @ApiProperty()
    @AutoMap()
    cargoId: string;

    @ApiProperty()
    @AutoMap()
    @IsLatitude({message: "Latitude is not valid"})
    lat: number;

    @ApiProperty()
    @AutoMap()
    @IsLongitude({message: "Longtitude is not valid"})
    long: number;
}