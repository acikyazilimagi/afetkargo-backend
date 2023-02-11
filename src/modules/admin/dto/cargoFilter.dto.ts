import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber } from "class-validator";

export class CargoFilterDto {
    @ApiProperty()
    @AutoMap()
    plateNo: string;

    @ApiProperty()
    @AutoMap()
    driverFullName: string;

    @ApiProperty()
    @AutoMap()
    @IsPhoneNumber("TR")
    driverPhone: string;
}