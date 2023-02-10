import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Multer } from "multer";

export class CreateUserDocumentDto {
    
    @ApiProperty()
    @AutoMap()
    userId: number;

    @ApiProperty()
    @AutoMap()
    documentTypeId: number;

    @ApiProperty()
    @AutoMap()
    document: Express.Multer.File;
}