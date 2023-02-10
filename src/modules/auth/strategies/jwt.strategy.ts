import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenType } from "src/common/constants";
import { Repository } from "typeorm";
import { User } from "../../user/model/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (
        @InjectRepository(User)
        private userRespository: Repository<User>
    ) {
        super({
            secretOrKey: 'secretkey',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(args: {
        userId: number,
        type: TokenType,
        // role: string
    }): Promise<User>{
        const user: User = await this.userRespository.findOne({id: args.userId});
        if(!user){
            throw new UnauthorizedException('User not found');
        }
        return user;
    }
}