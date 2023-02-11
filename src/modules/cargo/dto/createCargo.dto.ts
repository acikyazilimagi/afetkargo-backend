import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsLatitude, IsLongitude, IsPhoneNumber } from "class-validator";
import { CreateReceiverDto } from "./createReceiver.dto";

export class CreateCargoDto{

    @ApiProperty()
    @AutoMap()
    plateNo: string;

    @ApiProperty()
    @AutoMap()
    driverFullname: string;

    @ApiProperty()
    @AutoMap()
    @IsPhoneNumber("TR")
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
    @IsLatitude()
    originLat: number;

    @ApiProperty()
    @AutoMap()
    @IsLongitude()
    originLong: number;

    @ApiProperty()
    @AutoMap()
    partialCount: number;

    @ApiProperty()
    @AutoMap()
    companyName: string;

    @ApiProperty({ isArray: true, type: CreateReceiverDto})
    @AutoMap()
    receiverList: CreateReceiverDto[];

    @ApiProperty()
    countyId: string;

    @ApiProperty()
    cityId: string;
}