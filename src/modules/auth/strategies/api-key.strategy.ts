import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import Strategy from 'passport-headerapikey';
import * as dotenv from 'dotenv';
import { dotEnvOptions } from '../../../common/config/dotenv-options';

dotenv.config(dotEnvOptions);
@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
    constructor(
    ) {
        super({ header: 'X-API-KEY', prefix: '' },
        true,
        async (apiKey, done) => {
            return this.validate(apiKey, done);
        });
    }

    public validate = (apiKey: string, done: (error: Error, data) => {}) => {
        if (process.env.API_KEY === apiKey) {
            done(null, true);
        }
        done(new UnauthorizedException(), null);
    }
}