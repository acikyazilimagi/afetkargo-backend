import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class RoleDto {

    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    name: string;
}