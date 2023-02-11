import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class CargoResponse {

    @ApiProperty()
    cargoId: string;

    @ApiProperty()
    cargoCode: string;

    @ApiProperty()
    driverPassword: string;

    @ApiProperty()
    receiverPassword: string;
}