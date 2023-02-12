import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, ApiKeyStrategy } from '../auth/strategies';
import { UserModule } from '../user/user.module';
import { EmailerModule } from '../../common/services/emailer/emailer.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
    imports: [
        passportModule,
        JwtModule.register({
            secret: 'secretkey',
            signOptions: {
                expiresIn: 3600,
            }
        }),
        forwardRef(() => UserModule),
        EmailerModule,
    ],
    providers: [AuthService, JwtStrategy, ApiKeyStrategy, ],
    controllers: [AuthController],
    exports: [JwtModule, AuthService]
})
export class AuthModule {}
