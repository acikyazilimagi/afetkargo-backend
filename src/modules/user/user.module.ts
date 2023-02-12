import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { UserProfile } from './user.profile';
import { EmailerModule } from '../../common/services/emailer/emailer.module';
import { Role, User, UserRole } from './model';
import { CommonModule } from '../common/common.module';

@Module({
    imports: [
        EmailerModule,
        TypeOrmModule.forFeature([User,Role,UserRole]),
        forwardRef(() => AuthModule),
        CommonModule,
        // FileUploadModule,
    ],
    providers: [UserService, UserProfile,],
    controllers: [UserController],
    exports: [UserService, TypeOrmModule]
})
export class UserModule {}
