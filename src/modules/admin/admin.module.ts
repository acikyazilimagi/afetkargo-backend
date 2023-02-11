import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { EmailerModule } from '../../common/services/emailer/emailer.module';
import { CommonModule } from '../common/common.module';
import { FileUploadModule } from 'src/common/services/aws/file-upload.module';
import { UserRole } from '../user/model/user-role.entity';
import { Role } from '../user/model/role.entity';
import { User } from '../user/model/user.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminProfile } from './admin.profile';

@Module({
    imports: [
        EmailerModule,
        TypeOrmModule.forFeature([User,Role,UserRole]),
        forwardRef(() => AuthModule),
        CommonModule,
        FileUploadModule,
    ],
    providers: [AdminService, AdminProfile,],
    controllers: [AdminController],
    exports: [AdminService, TypeOrmModule]
})
export class UserModule {}
