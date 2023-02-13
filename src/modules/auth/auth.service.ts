import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { TokenType } from "../../common/constants";
import { validateHash } from "../../common/utils/hash";
import { UserDto } from "../user/dto/user.dto";
import { User } from "../user/model/user.entity";
import { UserService } from "../user/user.service";
import { CommonApiResponse } from "../../common/base/base-api-response.dto";
import { UserLoginDto, UserRegisterDto, LoginPayloadDto, TokenPayloadDto } from "./dto";

@Injectable()
export class AuthService {
    
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
        @InjectMapper()
        private readonly mapper: Mapper
    ) {}

    async userRegister(userRegisterDto: UserRegisterDto): Promise<CommonApiResponse<UserDto>>{
        const createdUser = await this.userService.createUser(userRegisterDto);
        return CommonApiResponse.success(this.mapper.map(createdUser, User, UserDto));
    }

    async userLogin(userLoginDto: UserLoginDto): Promise<CommonApiResponse<LoginPayloadDto>> {
        try {
            const user = await this.validateUser(userLoginDto);
            const tokenPayload = await this.createAccessToken({ userId: user.id });
            const res =  new LoginPayloadDto({
                user: this.mapper.map(user, User, UserDto),
                token: tokenPayload
            });
            return CommonApiResponse.success(res);
        }
        catch(error) {
            this.logger.error(error.message);
            throw new UnauthorizedException(error.message);
        }
    }

    private async validateUser(userLoginDto: UserLoginDto): Promise<User> {
        const user = await this.userService.findByEmail(userLoginDto.email);
        if(!user) {
            throw new NotFoundException('User not found')
        }
        const isValid = await validateHash(userLoginDto.password, user?.password);
        if(!isValid) {
            throw new UnauthorizedException('Check mail or password');
        }
        return user!;
    }

    async createAccessToken(data: {
        userId: string,
    }): Promise<TokenPayloadDto> {
        return new TokenPayloadDto({
            expiresIn: 36000,
            accessToken: await this.jwtService.signAsync({
                userId: data.userId,
                type: TokenType.ACCESS_TOKEN,
                // role: data.role
            })
        });
    }

    getCurrentUser(user: User): CommonApiResponse<UserDto> {
        return CommonApiResponse.success(this.mapper.map(user, User, UserDto));
    }
}