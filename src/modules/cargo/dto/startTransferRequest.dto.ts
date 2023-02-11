import { ApiProperty } from "@nestjs/swagger";

export class StartTransferRequest {

    @ApiProperty()
    driverPassword: string;

    @ApiProperty()
    plateNo: string;

    @ApiProperty()
    cargoId: string;


    
}