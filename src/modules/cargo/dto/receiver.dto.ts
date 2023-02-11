import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "src/common/base/base.dto";

export class ReceiverDto extends BaseDto{
    
    @ApiProperty()
    @AutoMap()
    cargoId: string;

    @ApiProperty()
    @AutoMap()
    receiverFullname: string;

    @ApiProperty()
    @AutoMap()
    receiverPhone: string;

    @ApiProperty()
    @AutoMap()
    destinationAddress: string;

    @ApiProperty()
    @AutoMap()
    destinationLat: number;

    @ApiProperty()
    @AutoMap()
    destinationLong: number;
}