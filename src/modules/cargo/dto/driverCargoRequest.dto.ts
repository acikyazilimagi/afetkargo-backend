import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class DriverCargoRequest {

    @ApiProperty()
    @AutoMap()
    driverPassword: string;

    @ApiProperty()
    @AutoMap()
    plateNo: string;
}