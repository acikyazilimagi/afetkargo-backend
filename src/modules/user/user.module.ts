import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { UserProfile } from './user.profile';
import { EmailerModule } from '../../common/services/emailer/emailer.module';
import { UserRole } from './model/user-role.entity';
import { Role } from './model/role.entity';
import { User } from './model/user.entity';
import { CommonModule } from '../common/common.module';
import { FileUploadModule } from 'src/common/services/aws/file-upload.module';

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
