import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class CargoFilterDto {
    
    @ApiProperty()
    @AutoMap()
    searchKey: string;
}