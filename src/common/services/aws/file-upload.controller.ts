import { Controller, HttpStatus, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileUploadService } from "./file-upload.service";

@Controller("file-upload")
// @ApiTags('file-upload')
export class FileUploadController {
    constructor(
        private readonly fileUploadService: FileUploadService,
    ) {}

    @Post("test")
    @ApiResponse({ status: HttpStatus.OK})
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    sendTestEmail(@UploadedFile() file: Express.Multer.File) {
       return this.fileUploadService.uploadFile(file);
    }

}