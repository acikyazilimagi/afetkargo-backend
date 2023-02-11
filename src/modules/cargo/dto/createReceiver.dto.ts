import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsLatitude, IsLongitude, IsPhoneNumber } from "class-validator";

export class CreateReceiverDto {
    
    @ApiProperty()
    @AutoMap()
    cargoId: string;

    @ApiProperty()
    @AutoMap()
    receiverFullname: string;

    @ApiProperty()
    @AutoMap()
    @IsPhoneNumber("TR")
    receiverPhone: string;

    @ApiProperty()
    @AutoMap()
    destinationAddress: string;

    @ApiProperty()
    @AutoMap()
    @IsLatitude()
    destinationLat: number;

    @ApiProperty()
    @AutoMap()
    @IsLongitude()
    destinationLong: number;
}