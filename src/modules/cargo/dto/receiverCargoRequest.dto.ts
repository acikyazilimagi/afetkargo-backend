import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class ReceiverCargoRequest {

    @ApiProperty()
    @AutoMap()
    receiverPassword: string;

    @ApiProperty()
    @AutoMap()
    plateNo: string;
}