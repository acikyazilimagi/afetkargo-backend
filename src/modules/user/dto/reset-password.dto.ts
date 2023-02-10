import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, Matches, MaxLength, MinLength } from "class-validator";

export class ResetPasswordDto {
    @ApiProperty()
    @IsUUID(4)
    token: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password too week',
    })
    password: string;
}