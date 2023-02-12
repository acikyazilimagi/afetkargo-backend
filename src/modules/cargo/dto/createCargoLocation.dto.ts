import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal} from "class-validator";

export class CreateCargoLocationDto {
    @ApiProperty()
    @AutoMap()
    cargoId: string;

    @ApiProperty()
    @AutoMap()
    @IsDecimal({message: "Latitude is not valid"})
    lat: number;

    @ApiProperty()
    @AutoMap()
    @IsDecimal({message: "Longtitude is not valid"})
    long: number;
}