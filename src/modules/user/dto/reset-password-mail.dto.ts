import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class ResetPasswordMailDto {
    @IsEmail()
    @ApiProperty()
    email: string;
}