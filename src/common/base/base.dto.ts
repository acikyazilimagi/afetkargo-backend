import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class BaseDto {
    @ApiProperty()
    @AutoMap()
    id: string;
    
    @ApiProperty()
    @AutoMap()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

}