import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { ApiKeyStrategy } from '../auth/strategies/api-key.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailerModule } from '../../common/services/emailer/emailer.module';
import { DatabaseModule } from 'src/database/database.module';
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
