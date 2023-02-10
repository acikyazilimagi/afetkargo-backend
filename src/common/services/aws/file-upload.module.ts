import { Module } from "@nestjs/common";
import { FileUploadController } from "./file-upload.controller";
import { FileUploadService } from "./file-upload.service";

@Module({
    imports: [],
    providers: [FileUploadService],
    controllers: [FileUploadController],
    exports: [FileUploadService]
})
export class FileUploadModule { }