import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "src/modules/user/dto/user.dto";
import { TokenPayloadDto } from "./token-payload.dto";

export class LoginPayloadDto {
    @ApiProperty({ type: UserDto})
    user: UserDto;

    @ApiProperty({ type: TokenPayloadDto})
    token: TokenPayloadDto;

    constructor(data: { user: UserDto, token: TokenPayloadDto }) { 
        this.user = data.user;
        this.token = data.token;
    }
}