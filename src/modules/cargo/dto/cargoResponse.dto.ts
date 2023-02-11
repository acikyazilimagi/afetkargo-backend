import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "src/common/base/base.dto";
import { ReceiverDto } from "./receiver.dto";

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