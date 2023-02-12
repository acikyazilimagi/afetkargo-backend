import { ApiProperty } from "@nestjs/swagger";

export class CargoResponse {

    @ApiProperty()
    cargoId: string;

    @ApiProperty()
    plateNo: string;

    @ApiProperty()
    cargoCode: string;

    @ApiProperty()
    driverPassword: string;

    @ApiProperty()
    receiverPassword: string;
}