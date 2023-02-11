import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "src/common/base/base.dto";
import { ReceiverDto } from "./receiver.dto";

export class ReceiverCargoResponse extends BaseDto{

    @ApiProperty()
    @AutoMap()
    plateNo: string;

    @ApiProperty()
    @AutoMap()
    inventory: string;

    @ApiProperty()
    @AutoMap()
    originAddress: string;

    @ApiProperty()
    @AutoMap()
    destinationAddress: string;

    @ApiProperty()
    @AutoMap()
    originLat: number;

    @ApiProperty()
    @AutoMap()
    originLong: number;

    @ApiProperty()
    @AutoMap()
    partialCount: number;

    @ApiProperty()
    thirdPartyToken: string;

    @ApiProperty()
    @AutoMap()
    companyName: string;

    @ApiProperty()
    @AutoMap()
    isActive: boolean;

    @ApiProperty()
    receiverList: ReceiverDto[];

    @ApiProperty()
    lat: number;

    @ApiProperty()
    long: number;
}