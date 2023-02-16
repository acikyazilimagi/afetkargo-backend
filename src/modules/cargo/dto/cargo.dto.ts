import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "src/common/base/base.dto";
import { CreateReceiverDto } from "./createReceiver.dto";

export class CargoDto extends BaseDto{

    @ApiProperty()
    @AutoMap()
    plateNo: string;

    @ApiProperty()
    @AutoMap()
    driverFullname: string;

    @ApiProperty()
    @AutoMap()
    driverPhone: string;

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
    @AutoMap()
    receiverList: CreateReceiverDto[];

    @ApiProperty()
    destinationCountyId: number;

    @ApiProperty()
    destinationCityId: number;

    @ApiProperty()
    @AutoMap()
    createdUser: string;

    @ApiProperty()
    @AutoMap()
    status: number;
}