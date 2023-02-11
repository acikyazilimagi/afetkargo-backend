import { ApiProperty } from "@nestjs/swagger";

export class FinishTransferRequest {

    @ApiProperty()
    cargoId: string;

    @ApiProperty()
    plateNo: string;

    @ApiProperty()
    receiverPassword: string;

    @ApiProperty()
    status: number;
}