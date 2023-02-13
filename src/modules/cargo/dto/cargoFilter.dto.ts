import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class CargoFilterDto {
    @ApiProperty()
    @AutoMap()
    plateNo: string;

    @ApiProperty()
    @AutoMap()
    driverFullName: string;

    @ApiProperty()
    @AutoMap()
    driverPhone: string;
}