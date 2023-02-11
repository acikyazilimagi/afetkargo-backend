import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "src/common/base/base.dto";
import { ReceiverDto } from "./receiver.dto";

export class DriverCargoRequest {

    @ApiProperty()
    @AutoMap()
    driverPassword: string;

    @ApiProperty()
    @AutoMap()
    plateNo: string;

}