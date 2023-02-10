import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "src/common/base/base.dto";

export class UserDto extends BaseDto {

    @ApiProperty()
    @AutoMap()
    name: string;

    @ApiProperty()
    @AutoMap()
    surname: string;

    @ApiProperty()
    @AutoMap()
    email: string;

    @ApiProperty()
    @AutoMap()
    phone: string;

    @ApiProperty()
    @AutoMap()
    isActive: boolean;

    @ApiProperty()
    @AutoMap()
    lastLogin: Date;

    @ApiProperty()
    @AutoMap()
    companyName: string;
}